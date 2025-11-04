<?php
include '../config/session_check.php';
include '../config/database.php';

$id = $_GET['id'];
$sql = "DELETE FROM bookings WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

$_SESSION['message'] = "Booking deleted successfully!";
header("Location: index.php");
exit();
?>