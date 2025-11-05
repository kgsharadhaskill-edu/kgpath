<?php
// --- STEP 1: All PHP logic goes at the TOP ---
include '../config/session_check.php';
include '../config/database.php';

// Check if an ID is provided in the URL and is valid
if (!isset($_GET['id']) || empty($_GET['id'])) {
    $_SESSION['message'] = "Error: No brochure request ID specified.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}
$id = $_GET['id'];

// --- STEP 2: Handle the form submission (only runs on POST request) ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic validation to ensure required fields are not empty
    if (empty($_POST['course_title']) || empty($_POST['contact_number'])) {
        $_SESSION['message'] = "Course Title and Contact Number are required.";
        $_SESSION['message_type'] = "danger";
        header("Location: edit.php?id=" . $id);
        exit();
    }
    
    // Prepare the SQL query
    $sql = "UPDATE brochure_requests SET course_title=?, contact_number=?, specialization=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    
    // Prepare the values to be executed
    $values = [
        $_POST['course_title'],
        $_POST['contact_number'],
        $_POST['specialization'], // This can be empty, so no validation needed unless required
        $id
    ];
    
    // Execute the query and set a success/failure message
    if ($stmt->execute($values)) {
        $_SESSION['message'] = "Brochure request updated successfully!";
        $_SESSION['message_type'] = "success";
    } else {
        $_SESSION['message'] = "Failed to update brochure request.";
        $_SESSION['message_type'] = "danger";
    }
    
    // --- STEP 3: Redirect AFTER processing ---
    header("Location: index.php");
    exit(); // Always exit after a redirect header
}

// --- STEP 4: Fetch data for displaying the form (only runs on GET request) ---
$stmt = $pdo->prepare("SELECT * FROM brochure_requests WHERE id = ?");
$stmt->execute([$id]);
$request = $stmt->fetch(PDO::FETCH_ASSOC);

// If no request is found with that ID, redirect back to the index page with an error
if (!$request) {
    $_SESSION['message'] = "Error: Brochure request not found.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}

// --- STEP 5: Now, start sending HTML output ---
$pageTitle = "Edit Brochure Request";
include '../templates/header.php';
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Brochure Request</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= htmlspecialchars($id) ?>" method="post">
            <div class="form-group mb-3">
                <label for="course_title">Course Title</label>
                <input type="text" id="course_title" name="course_title" class="form-control" value="<?= htmlspecialchars($request['course_title']) ?>" required>
            </div>
            <div class="form-group mb-3">
                <label for="contact_number">Contact Number</label>
                <input type="tel" id="contact_number" name="contact_number" class="form-control" value="<?= htmlspecialchars($request['contact_number']) ?>" required>
            </div>
            <div class="form-group mb-3">
                <label for="specialization">Specialization</label>
                <input type="text" id="specialization" name="specialization" class="form-control" value="<?= htmlspecialchars($request['specialization']) ?>">
                <small class="form-text text-muted">This field is optional.</small>
            </div>
            <button type="submit" class="btn btn-primary">Update Request</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>