<?php
// --- DATABASE CONNECTION (Needs to be included early) ---
require_once 'db.php';

// --- HEADERS ---
header("Content-Type: application/json; charset=UTF-8");

// Define allowed origins for CORS
$allowedOrigins = [
    "http://localhost:5173",
    "https://kgpath.com",
    "https://kg-pa-th.netlify.app"
];

// Check the origin and set the correct header
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request from the browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- START FIX: READ AND VALIDATE INCOMING JSON DATA ---
// This entire block was missing and is the cause of the 400 error.
// It reads the raw data from the POST request and decodes it into the $data variable.

// 1. Get the raw POST data sent from the frontend
$rawPayload = file_get_contents("php://input");

// 2. Try to decode the JSON payload into a PHP object
$data = json_decode($rawPayload);

// 3. Check for JSON decoding errors. This is crucial for debugging.
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON payload received. The server could not parse the request body.',
        'json_error' => json_last_error_msg(), // Provides the specific JSON error
        'received_payload' => $rawPayload    // Shows what the server actually received
    ]);
    exit;
}

// 4. Check if the decoded data is an object and if the 'action' property exists
if (!is_object($data) || !isset($data->action)) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'status' => 'error',
        'message' => 'Required "action" parameter not found in the JSON payload.',
        'received_data' => $data // Shows the decoded data for debugging
    ]);
    exit;
}
// --- END FIX ---


// --- MAIN LOGIC (Now safely uses the validated $data variable) ---
$action = $data->action;

switch ($action) {
    case 'initiate_live_chat':
        handleInitiateLiveChat($pdo, $data);
        break;

    case 'send_message':
        handleSendMessage($pdo, $data);
        break;

    case 'get_messages':
        handleGetMessages($pdo, $data);
        break;

    default:
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid action specified.']);
        break;
}

// --- FUNCTION DEFINITIONS (No changes needed below) ---

function handleInitiateLiveChat($pdo, $data) {
    if (!isset($data->sessionId) || !isset($data->message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing sessionId or initial message.']);
        return;
    }

    $sessionId = htmlspecialchars(strip_tags($data->sessionId));
    $initialMessage = htmlspecialchars(strip_tags($data->message));

    // Check if session already exists
    $stmt = $pdo->prepare("SELECT id FROM chat_sessions WHERE session_id = ?");
    $stmt->execute([$sessionId]);
    if ($stmt->fetch()) {
        // This isn't an error, just means the chat was already initiated.
        // We can proceed to fetch messages for it on the frontend.
        echo json_encode(['status' => 'success', 'message' => 'Session already exists.']);
        return;
    }

    // Find available agent
    $stmt = $pdo->prepare("SELECT id FROM agents WHERE status = 'online' LIMIT 1");
    $stmt->execute();
    $agent = $stmt->fetch();

    $pdo->beginTransaction();
    try {
        if ($agent) {
            $stmt = $pdo->prepare("INSERT INTO chat_sessions (session_id, status, agent_id) VALUES (?, 'active', ?)");
            $stmt->execute([$sessionId, $agent['id']]);
            $sessionTableId = $pdo->lastInsertId();
            $systemMessage = "An agent is available! You will be connected shortly.";
            $responseMessage = "Hello! You've been connected with our support team. How can we help you?";
            $sender = 'agent';
        } else {
            $stmt = $pdo->prepare("INSERT INTO chat_sessions (session_id, status) VALUES (?, 'pending')");
            $stmt->execute([$sessionId]);
            $sessionTableId = $pdo->lastInsertId();
            $systemMessage = "All our agents are currently busy.";
            $responseMessage = "Thank you for reaching out! We will connect you with an available agent soon.";
            $sender = 'system';
        }

        // Save user and system messages
        $stmt = $pdo->prepare("INSERT INTO chat_messages (session_table_id, sender, message) VALUES (?, 'user', ?)");
        $stmt->execute([$sessionTableId, $initialMessage]);

        $stmt = $pdo->prepare("INSERT INTO chat_messages (session_table_id, sender, message) VALUES (?, ?, ?)");
        $stmt->execute([$sessionTableId, $sender, $responseMessage]);
        $lastMsgId = $pdo->lastInsertId();

        $pdo->commit();

        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'agent_available' => !empty($agent),
            'system_message' => $systemMessage,
            'initial_response' => [
                'id' => $lastMsgId,
                'role' => $sender === 'agent' ? 'model' : 'system',
                'parts' => [['text' => $responseMessage]]
            ]
        ]);

    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function handleSendMessage($pdo, $data) {
    if (!isset($data->sessionId) || !isset($data->message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing sessionId or message.']);
        return;
    }

    $sessionId = htmlspecialchars(strip_tags($data->sessionId));
    $message = htmlspecialchars(strip_tags($data->message));

    $stmt = $pdo->prepare("SELECT id FROM chat_sessions WHERE session_id = ?");
    $stmt->execute([$sessionId]);
    $session = $stmt->fetch();

    if (!$session) {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Session not found.']);
        return;
    }

    $stmt = $pdo->prepare("INSERT INTO chat_messages (session_table_id, sender, message) VALUES (?, 'user', ?)");
    if ($stmt->execute([$session['id'], $message])) {
        echo json_encode(['status' => 'success', 'message' => 'Message sent.']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to send message.']);
    }
}

function handleGetMessages($pdo, $data) {
    if (!isset($data->sessionId) || !isset($data->lastMessageId)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing sessionId or lastMessageId.']);
        return;
    }

    $sessionId = htmlspecialchars(strip_tags($data->sessionId));
    $lastMessageId = (int)$data->lastMessageId;

    $stmt = $pdo->prepare("SELECT id FROM chat_sessions WHERE session_id = ?");
    $stmt->execute([$sessionId]);
    $session = $stmt->fetch();

    if (!$session) {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Session not found.']);
        return;
    }

    $stmt = $pdo->prepare("
        SELECT id, sender, message 
        FROM chat_messages 
        WHERE session_table_id = ? AND id > ? AND sender IN ('agent', 'system')
        ORDER BY timestamp ASC
    ");
    $stmt->execute([$session['id'], $lastMessageId]);
    $newMessages = $stmt->fetchAll();

    $formattedMessages = array_map(function ($msg) {
        return [
            'id' => $msg['id'],
            'role' => $msg['sender'] === 'agent' ? 'model' : 'system',
            'parts' => [['text' => $msg['message']]]
        ];
    }, $newMessages);

    echo json_encode(['status' => 'success', 'messages' => $formattedMessages]);
}
?>