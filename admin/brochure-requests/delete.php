<?php
include '../config/session_check.php';
include '../config/database.php';

$id = $_GET['id'];
$sql = "DELETE FROM brochure_requests WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

$_SESSION['message'] = "Brochure request deleted successfully!";
header("Location: index.php");
exit();
?>