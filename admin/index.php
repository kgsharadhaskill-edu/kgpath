<?php
include 'config/session_check.php';
$pageTitle = "Dashboard";
include 'templates/header.php';
?>

<div class="row">
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner"><h3>Enrollments</h3><p>Manage student enrollments.</p></div>
            <div class="icon"><i class="fas fa-user-graduate"></i></div>
            <a href="enrollments/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <div class="small-box bg-success">
            <div class="inner"><h3>Bookings</h3><p>Manage all bookings.</p></div>
            <div class="icon"><i class="fas fa-calendar-check"></i></div>
            <a href="bookings/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
            <div class="inner"><h3>Brochures</h3><p>View brochure requests.</p></div>
            <div class="icon"><i class="fas fa-file-download"></i></div>
            <a href="brochure-requests/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <div class="small-box bg-danger">
            <div class="inner"><h3>Call Clicks</h3><p>Track counselor call clicks.</p></div>
            <div class="icon"><i class="fas fa-phone"></i></div>
            <a href="call-clicks/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
</div>

<?php include 'templates/footer.php'; ?>