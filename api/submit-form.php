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

require_once "db.php"; // ✅ This gives $pdo connection

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

// Validate input
if (
    empty($data['name']) ||
    empty($data['mobile']) ||
    empty($data['education']) ||
    empty($data['course']) ||
    empty($data['dob'])
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit();
}

try {
    $query = "INSERT INTO enrollments (name, mobile, education, course, dob)
              VALUES (:name, :mobile, :education, :course, :dob)";

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(":name", $data['name']);
    $stmt->bindParam(":mobile", $data['mobile']);
    $stmt->bindParam(":education", $data['education']);
    $stmt->bindParam(":course", $data['course']);
    $stmt->bindParam(":dob", $data['dob']);

    $stmt->execute();

    http_response_code(201);
    echo json_encode(["status" => "success", "message" => "Form submitted successfully!"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to submit form: " . $e->getMessage()
    ]);
}
?>
