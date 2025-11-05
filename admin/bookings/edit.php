<?php
// --- STEP 1: All PHP logic goes at the TOP ---
include '../config/session_check.php';
include '../config/database.php';

// Check if an ID is provided in the URL
if (!isset($_GET['id']) || empty($_GET['id'])) {
    $_SESSION['message'] = "Error: No booking ID specified.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}
$id = $_GET['id'];

// --- STEP 2: Handle the form submission ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // ✅ UPDATE: Add name and phone_number to validation
    if (empty($_POST['name']) || empty($_POST['phone_number']) || empty($_POST['booking_date']) || empty($_POST['booking_time'])) {
        $_SESSION['message'] = "All fields are required.";
        $_SESSION['message_type'] = "danger";
        header("Location: edit.php?id=" . $id);
        exit();
    }
    
    // ✅ UPDATE: Modify the SQL query to include name and phone_number
    $sql = "UPDATE bookings SET name=?, phone_number=?, booking_date=?, booking_time=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    
    // ✅ UPDATE: Add the new POST variables to the execute array in the correct order
    $values = [
        $_POST['name'],
        $_POST['phone_number'],
        $_POST['booking_date'],
        $_POST['booking_time'],
        $id
    ];
    
    if ($stmt->execute($values)) {
        $_SESSION['message'] = "Booking updated successfully!";
        $_SESSION['message_type'] = "success";
    } else {
        $_SESSION['message'] = "Failed to update booking.";
        $_SESSION['message_type'] = "danger";
    }
    
    // --- STEP 3: Redirect AFTER processing ---
    header("Location: index.php");
    exit();
}

// --- STEP 4: Fetch data for displaying the form ---
// The SELECT * query automatically gets the new columns, so no change needed here.
$stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ?");
$stmt->execute([$id]);
$booking = $stmt->fetch(PDO::FETCH_ASSOC);

// If no booking is found, redirect.
if (!$booking) {
    $_SESSION['message'] = "Error: Booking not found.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}

// --- STEP 5: Start sending HTML ---
$pageTitle = "Edit Booking";
include '../templates/header.php'; 
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Booking</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= htmlspecialchars($id) ?>" method="post">

            <!-- ✅ UPDATE: Add form group for Name -->
            <div class="form-group mb-3">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" class="form-control" value="<?= htmlspecialchars($booking['name']) ?>" required>
            </div>

            <!-- ✅ UPDATE: Add form group for Phone Number -->
            <div class="form-group mb-3">
                <label for="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" class="form-control" value="<?= htmlspecialchars($booking['phone_number']) ?>" required>
            </div>
            
            <hr>

            <div class="form-group mb-3">
                <label for="booking_date">Booking Date</label>
                <input type="date" id="booking_date" name="booking_date" class="form-control" value="<?= htmlspecialchars($booking['booking_date']) ?>" required>
            </div>
            
            <div class="form-group mb-3">
                <label for="booking_time">Booking Time</label>
                <input type="time" id="booking_time" name="booking_time" class="form-control" value="<?= htmlspecialchars($booking['booking_time']) ?>" required>
            </div>
            
            <button type="submit" class="btn btn-primary">Update Booking</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>