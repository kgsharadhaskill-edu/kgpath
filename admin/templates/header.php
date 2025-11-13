<?php
$basePath = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');

// Detect root path up to admin
if (strpos($basePath, '/admin') !== false) {
    $basePath = substr($basePath, 0, strpos($basePath, '/admin'));
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Dashboard</title>
  <link rel="icon" type="image/png" href="<?php echo $basePath; ?>/admin/dist/img/favicon.png">  
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="<?= $basePath ?>/admin/dist/img/favicon.png" alt="AdminLTELogo" height="60" width="60">
  </div>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
  </nav>

  <aside class="main-sidebar sidebar-dark-primary elevation-4">
   <a href="<?php echo $basePath; ?>/admin/index.php" 
   class="brand-link d-flex justify-content-center align-items-center text-center">

    <img src="<?php echo $basePath; ?>/admin/dist/img/favicon.png"
         alt="Admin Logo"
         class="brand-image img-circle mr-2"
         style="opacity: .8; width:35px; height:35px; object-fit:cover;">

    <span class="brand-text font-weight-light">Admin</span>
    </a>
    <div class="sidebar">
      <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                
                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/index.php" class="nav-link">
                        <i class="nav-icon fas fa-tachometer-alt"></i><p>Dashboard</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/enrollments/index.php" class="nav-link">
                        <i class="nav-icon fas fa-user-graduate"></i><p>Enrollments</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/bookings/index.php" class="nav-link">
                        <i class="nav-icon fas fa-calendar-check"></i><p>Bookings</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/brochure-requests/index.php" class="nav-link">
                        <i class="nav-icon fas fa-file-download"></i><p>Brochure Requests</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/chatbot.php" class="nav-link">
                        <i class="nav-icon fas fa-comments"></i><p>Live Chat</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/call-clicks/index.php" class="nav-link">
                        <i class="nav-icon fas fa-phone"></i><p>Call Clicks</p>
                    </a>
                </li>
                
                <li class="nav-item">
                    <a href="<?php echo $basePath; ?>/admin/users/index.php" class="nav-link">
                        <i class="nav-icon fas fa-users-cog"></i><p>Manage Users</p>
                    </a>
                </li>

                <li class="nav-item" style="margin-top: 20px; border-top: 1px solid #4f5962;">
                    <a href="<?php echo $basePath; ?>/admin/logout.php" class="nav-link">
                        <i class="nav-icon fas fa-sign-out-alt"></i><p>Logout</p>
                    </a>
                </li>

            </ul>
        </nav>
    </div>
  </aside>

  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0"><?php echo $pageTitle ?? 'Dashboard'; ?></h1>
          </div>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <?php if (isset($_SESSION['message'])): ?>
        <div class="alert alert-success">
            <?php echo $_SESSION['message']; unset($_SESSION['message']); ?>
        </div>
        <?php endif; ?>