<?php
// This file generates a CSV download of all brochure requests
include '../config/session_check.php';
include '../config/database.php';

// Set headers to force download
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=brochure_requests_export_' . date('Y-m-d') . '.csv');

// Create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// Output the CSV column headers
fputcsv($output, ['ID', 'Course Title', 'Contact Number', 'Specialization', 'Requested At']);

// Fetch all records from the database
$stmt = $pdo->query("SELECT id, course_title, contact_number, specialization, created_at FROM brochure_requests ORDER BY id ASC");
$requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Loop through the rows and output them to the CSV file
if ($requests) {
    foreach ($requests as $row) {
        fputcsv($output, $row);
    }
}

fclose($output);
exit();