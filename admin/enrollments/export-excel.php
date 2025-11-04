<?php
// This file generates a CSV download of all enrollments
include '../config/session_check.php';
include '../config/database.php';

// Set headers to force download
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=enrollments_export_' . date('Y-m-d') . '.csv');

// Create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// Output the CSV column headers
fputcsv($output, ['ID', 'Name', 'Mobile', 'Education', 'Course', 'Date of Birth', 'Submission Date']);

// Fetch all records from the database
$stmt = $pdo->query("SELECT id, name, mobile, education, course, dob, submission_date FROM enrollments ORDER BY id ASC");
$enrollments = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Loop through the rows and output them to the CSV file
if ($enrollments) {
    foreach ($enrollments as $row) {
        fputcsv($output, $row);
    }
}

fclose($output);
exit();