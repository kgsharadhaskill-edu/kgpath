<?php
// --- STEP 1: All PHP logic goes at the TOP ---
include '../config/session_check.php';
include '../config/database.php';

// Check if an ID is provided in the URL and is valid
if (!isset($_GET['id']) || empty($_GET['id'])) {
    $_SESSION['message'] = "Error: No call click ID specified.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}
$id = $_GET['id'];

// --- STEP 2: Handle the form submission (only runs on POST request) ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Server-side validation for required fields
    if (empty($_POST['counselor_id']) || empty($_POST['counselor_name'])) {
        $_SESSION['message'] = "Counselor ID and Name are required fields.";
        $_SESSION['message_type'] = "danger";
        header("Location: edit.php?id=" . $id);
        exit();
    }
    
    // Prepare the SQL query
    $sql = "UPDATE call_clicks SET counselor_id=?, counselor_name=?, user_ip_address=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    
    // Prepare the values to be executed
    $values = [
        $_POST['counselor_id'],
        $_POST['counselor_name'],
        $_POST['user_ip_address'], // This can be empty/null
        $id
    ];
    
    // Execute and set appropriate session message
    if ($stmt->execute($values)) {
        $_SESSION['message'] = "Call click record updated successfully!";
        $_SESSION['message_type'] = "success";
    } else {
        $_SESSION['message'] = "Failed to update call click record.";
        $_SESSION['message_type'] = "danger";
    }
    
    // --- STEP 3: Redirect AFTER processing ---
    header("Location: index.php");
    exit(); // Always exit after a redirect
}

// --- STEP 4: Fetch data for the form (only runs on GET request) ---
$stmt = $pdo->prepare("SELECT * FROM call_clicks WHERE id = ?");
$stmt->execute([$id]);
$click = $stmt->fetch(PDO::FETCH_ASSOC);

// If no record is found with that ID, redirect with an error message
if (!$click) {
    $_SESSION['message'] = "Error: Call click record not found.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}

// --- STEP 5: Start sending HTML output ---
$pageTitle = "Edit Call Click";
include '../templates/header.php';
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Call Click</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= htmlspecialchars($id) ?>" method="post">
            <div class="form-group mb-3">
                <label for="counselor_id">Counselor ID</label>
                <input type="number" id="counselor_id" name="counselor_id" class="form-control" value="<?= htmlspecialchars($click['counselor_id']) ?>" required>
            </div>
            <div class="form-group mb-3">
                <label for="counselor_name">Counselor Name</label>
                <input type="text" id="counselor_name" name="counselor_name" class="form-control" value="<?= htmlspecialchars($click['counselor_name']) ?>" required>
            </div>
            <div class="form-group mb-3">
                <label for="user_ip_address">User IP Address</label>
                <input type="text" id="user_ip_address" name="user_ip_address" class="form-control" value="<?= htmlspecialchars($click['user_ip_address']) ?>">
                <small class="form-text text-muted">This field can be left blank.</small>
            </div>
            <button type="submit" class="btn btn-primary">Update Call Click</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>