<?php
$allowedOrigins = [
    "http://localhost:5173",
    "https://opsonic-jonah-indistinctive.ngrok-free.dev",
    "https://kg-pa-th.netlify.app"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Preflight check (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include DB Connection (PDO)
require_once "db.php"; // gives $pdo

// ===================
// API LOGIC
// ===================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data);

    // Validate input
    if (!isset($data->counselorId) || !isset($data->counselorName)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required data"]);
        exit;
    }

    // Sanitize input
    $counselorId = filter_var($data->counselorId, FILTER_SANITIZE_NUMBER_INT);
    $counselorName = htmlspecialchars(trim($data->counselorName), ENT_QUOTES, 'UTF-8');
    $userIp = $_SERVER['REMOTE_ADDR'];

    try {
        $stmt = $pdo->prepare("
            INSERT INTO call_clicks (counselor_id, counselor_name, user_ip_address)
            VALUES (:id, :name, :ip)
        ");

        $stmt->bindParam(':id', $counselorId, PDO::PARAM_INT);
        $stmt->bindParam(':name', $counselorName, PDO::PARAM_STR);
        $stmt->bindParam(':ip', $userIp, PDO::PARAM_STR);

        $stmt->execute();

        echo json_encode(["status" => "success", "message" => "Call click tracked successfully."]);
    } 
    catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to track click: " . $e->getMessage()]);
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
