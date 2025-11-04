<?php
include '../config/session_check.php';
include '../config/database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ids']) && is_array($_POST['ids'])) {
    $ids = $_POST['ids'];
    $sanitized_ids = array_map('intval', $ids);

    // Ensure the logged-in user cannot be in the list of IDs to be deleted
    $current_user_id = $_SESSION['id'];
    if (($key = array_search($current_user_id, $sanitized_ids)) !== false) {
        unset($sanitized_ids[$key]);
    }
    
    if (empty($sanitized_ids)) {
        $_SESSION['message'] = "No valid users were selected for deletion.";
        header("Location: index.php");
        exit();
    }
    
    $placeholders = implode(',', array_fill(0, count($sanitized_ids), '?'));
    
    $sql = "DELETE FROM users WHERE id IN ({$placeholders})";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute($sanitized_ids);
        $_SESSION['message'] = "Successfully deleted " . $stmt->rowCount() . " user(s).";
    } catch (PDOException $e) {
        $_SESSION['message'] = "Error: Could not delete the users. " . $e->getMessage();
    }

} else {
    $_SESSION['message'] = "Invalid request or no users selected.";
}

header("Location: index.php");
exit();