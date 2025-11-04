<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    
    // Auto-detect login.php location
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
    $host = $_SERVER['HTTP_HOST'];

    // Find root path up to /admin
    $currentPath = dirname($_SERVER['PHP_SELF']);
    $projectRoot = substr($currentPath, 0, strpos($currentPath, "/admin"));

    $login_url = $protocol . $host . $projectRoot . "/admin/login.php";

    header("Location: " . $login_url);
    exit;
}
?>
