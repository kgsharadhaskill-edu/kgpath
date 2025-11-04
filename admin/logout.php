<?php
include 'config/session_check.php';

$_SESSION = array();

session_destroy();

header("location: login.php");
exit;
?>