<?php
include '../config/session_check.php';
include '../config/database.php';

// --- PROCESS POST REQUEST FIRST, BEFORE ANY HTML OUTPUT ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "INSERT INTO bookings (booking_date, booking_time) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([
            $_POST['booking_date'], 
            $_POST['booking_time']
        ]);
        $_SESSION['message'] = "Booking added successfully!";
    } catch (PDOException $e) {
        $_SESSION['message'] = "Error adding booking: " . $e->getMessage();
    }
    
    // Redirect back to the index page
    header("Location: index.php");
    exit(); // Crucial to stop the script here
}

// --- IF NOT A POST REQUEST, THEN DISPLAY THE FORM ---

// Now we can set the page title and include the header
$pageTitle = "Add Booking";
include '../templates/header.php';
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