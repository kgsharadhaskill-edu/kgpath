<?php
// This file generates a CSV download of all bookings
include '../config/session_check.php';
include '../config/database.php';

// Set headers to force download
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=bookings_export_' . date('Y-m-d') . '.csv');

// Create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// Output the CSV column headers
fputcsv($output, ['ID', 'Booking Date', 'Booking Time', 'Created At']);

// Fetch all records from the database
$stmt = $pdo->query("SELECT id, booking_date, booking_time, created_at FROM bookings ORDER BY id ASC");
$bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Loop through the rows and output them to the CSV file
if ($bookings) {
    foreach ($bookings as $row) {
        fputcsv($output, $row);
    }
}

fclose($output);
exit();