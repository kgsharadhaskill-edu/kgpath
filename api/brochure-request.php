<?php
header("Access-Control-Allow-Origin: ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->contactNumber) || empty(trim($data->contactNumber)) ||
    !isset($data->specialization) || empty(trim($data->specialization)) ||
    !isset($data->courseTitle) || empty(trim($data->courseTitle))
) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
    exit;
}

$contactNumber = filter_var(trim($data->contactNumber), FILTER_SANITIZE_STRING);
$specialization = filter_var(trim($data->specialization), FILTER_SANITIZE_STRING);
$courseTitle = filter_var(trim($data->courseTitle), FILTER_SANITIZE_STRING);

try {
    $sql = "INSERT INTO brochure_requests (course_title, contact_number, specialization) VALUES (:course_title, :contact_number, :specialization)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':course_title', $courseTitle);
    $stmt->bindParam(':contact_number', $contactNumber);
    $stmt->bindParam(':specialization', $specialization);

    $stmt->execute();
    
    http_response_code(200);
    echo json_encode([
        'status' => 'success', 
        'message' => 'Your request has been submitted successfully.',
        'brochureUrl' => '/brochures/sample-course-brochure.pdf'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Unable to process your request. Please try again later.']);
}