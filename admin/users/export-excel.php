<?php
include '../config/session_check.php';
include '../config/database.php';

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=users_export_' . date('Y-m-d') . '.csv');

$output = fopen('php://output', 'w');
fputcsv($output, ['ID', 'Username', 'Email', 'Created At']);

$stmt = $pdo->query("SELECT id, username, email, created_at FROM users ORDER BY id ASC");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($users) {
    foreach ($users as $row) {
        fputcsv($output, $row);
    }
}

fclose($output);
exit();