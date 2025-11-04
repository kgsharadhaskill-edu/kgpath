<?php
// This file generates a CSV download of all call clicks
include '../config/session_check.php';
include '../config/database.php';

// Set headers to force download
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=call_clicks_export_' . date('Y-m-d') . '.csv');

// Create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// Output the CSV column headers
fputcsv($output, ['ID', 'Counselor ID', 'Counselor Name', 'User IP Address', 'Timestamp']);

// Fetch all records from the database
$stmt = $pdo->query("SELECT id, counselor_id, counselor_name, user_ip_address, click_timestamp FROM call_clicks ORDER BY id ASC");
$clicks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Loop through the rows and output them to the CSV file
if ($clicks) {
    foreach ($clicks as $row) {
        fputcsv($output, $row);
    }
}

fclose($output);
exit();