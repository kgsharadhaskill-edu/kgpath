<?php
include '../config/session_check.php';
$pageTitle = "Add Booking";
include '../config/database.php';
include '../templates/header.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "INSERT INTO bookings (booking_date, booking_time) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['booking_date'], $_POST['booking_time']]);
    $_SESSION['message'] = "Booking added successfully!";
    header("Location: index.php");
    exit();
}
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">New Booking Form</h3>
    </div>
    <div class="card-body">
        <form action="create.php" method="post">
            <div class="form-group">
                <label>Booking Date</label>
                <input type="date" name="booking_date" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Booking Time</label>
                <input type="text" name="booking_time" class="form-control" placeholder="e.g., 10:00 AM" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>