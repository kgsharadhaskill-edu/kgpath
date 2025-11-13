<?php
header("Content-Type: application/json; charset=UTF-8");

$allowedOrigins = [
    "http://localhost:5173",
    "https://kgpath.com",
    "https://kg-pa-th.netlify.app"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php'; // your PDO file

try {
    // Fetch recent 3 bookings
    $stmt = $pdo->prepare("SELECT name, created_at FROM bookings ORDER BY created_at DESC LIMIT 3");
    $stmt->execute();
    $recent = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch total count of bookings
    $totalStmt = $pdo->prepare("SELECT COUNT(*) AS total FROM bookings");
    $totalStmt->execute();
    $total = $totalStmt->fetch(PDO::FETCH_ASSOC)['total'];

    echo json_encode([
        "recent" => $recent,
        "total_bookings" => (int)$total,
        "avg_rating" => 4.9 // static for now
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>
