<?php
header("Content-Type: application/json; charset=UTF-8");

set_exception_handler(function ($exception) {
    error_log($exception->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'An unexpected server error occurred.'
    ]);
    exit();
});

set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method. Only POST is accepted.']);
    exit();
}

try {
    require_once 'db.php';

    if (!isset($pdo) || !$pdo instanceof PDO) {
        throw new RuntimeException("Database connection is not available or invalid.");
    }

    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->selectedDate, $data->selectedTime) || empty(trim($data->selectedDate)) || empty(trim($data->selectedTime))) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid input. Date and Time are required.']);
        exit();
    }

    $selectedDate = htmlspecialchars(trim($data->selectedDate), ENT_QUOTES, 'UTF-8');
    $selectedTime = htmlspecialchars(trim($data->selectedTime), ENT_QUOTES, 'UTF-8');

    $sql = "INSERT INTO bookings (booking_date, booking_time) VALUES (:booking_date, :booking_time)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':booking_date', $selectedDate, PDO::PARAM_STR);
    $stmt->bindParam(':booking_time', $selectedTime, PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['status' => 'success', 'message' => 'Booking confirmed successfully!']);
    } else {
        throw new RuntimeException("The database query failed to execute.");
    }

} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    http_response_code(503);
    echo json_encode([
        'status' => 'error', 
        'message' => 'A database error occurred. Please try again later.'
    ]);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'A server error occurred: ' . $e->getMessage()
    ]);
}
?>
