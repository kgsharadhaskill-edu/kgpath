<?php
include '../config/session_check.php';
include '../config/database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ids']) && is_array($_POST['ids'])) {
    $ids = $_POST['ids'];
    
    // Ensure all IDs are integers for security
    $sanitized_ids = array_map('intval', $ids);
    
    if (empty($sanitized_ids)) {
        $_SESSION['message'] = "No items were selected for deletion.";
        header("Location: index.php");
        exit();
    }
    
    // Create a string of question mark placeholders, e.g., "?,?,?"
    $placeholders = implode(',', array_fill(0, count($sanitized_ids), '?'));
    
    // Prepare the SQL statement
    $sql = "DELETE FROM call_clicks WHERE id IN ({$placeholders})";
    $stmt = $pdo->prepare($sql);
    
    try {
        // Execute the statement with the array of IDs
        $stmt->execute($sanitized_ids);
        $_SESSION['message'] = "Successfully deleted " . $stmt->rowCount() . " call click record(s).";
    } catch (PDOException $e) {
        $_SESSION['message'] = "Error: Could not delete the records. " . $e->getMessage();
    }

} else {
    $_SESSION['message'] = "Invalid request or no items selected.";
}

header("Location: index.php");
exit();