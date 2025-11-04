<?php
include '../config/session_check.php';
$pageTitle = "Edit Booking";
include '../config/database.php';
include '../templates/header.php';

$id = $_GET['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "UPDATE bookings SET booking_date=?, booking_time=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['booking_date'], $_POST['booking_time'], $id]);
    $_SESSION['message'] = "Booking updated successfully!";
    header("Location: index.php");
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ?");
$stmt->execute([$id]);
$booking = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Booking</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= $id ?>" method="post">
            <div class="form-group">
                <label>Booking Date</label>
                <input type="date" name="booking_date" class="form-control" value="<?= htmlspecialchars($booking['booking_date']) ?>" required>
            </div>
            <div class="form-group">
                <label>Booking Time</label>
                <input type="text" name="booking_time" class="form-control" value="<?= htmlspecialchars($booking['booking_time']) ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>