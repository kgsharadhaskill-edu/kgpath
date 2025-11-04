<?php
include '../config/session_check.php';
include '../config/database.php';

$id = $_GET['id'];

// Prevent user from deleting their own account
if ($id == $_SESSION['id']) {
    $_SESSION['message'] = "Error: You cannot delete your own account.";
    header("Location: index.php");
    exit();
}

$sql = "DELETE FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

$_SESSION['message'] = "User deleted successfully!";
header("Location: index.php");
exit();
?>