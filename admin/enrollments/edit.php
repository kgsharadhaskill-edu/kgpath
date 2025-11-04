<?php
include '../config/session_check.php';
include '../config/database.php';

// Ensure we have an ID, redirect if not
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: index.php");
    exit();
}
$id = $_GET['id'];

// --- PROCESS POST REQUEST FIRST, BEFORE ANY HTML OUTPUT ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // No need to get ID from $_GET here, we already have it from the top
    $sql = "UPDATE enrollments SET name=?, mobile=?, education=?, course=?, dob=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([
            $_POST['name'],
            $_POST['mobile'],
            $_POST['education'],
            $_POST['course'],
            $_POST['dob'],
            $id
        ]);
        $_SESSION['message'] = "Enrollment updated successfully!";
    } catch (PDOException $e) {
        // Optional: Set an error message
        $_SESSION['message'] = "Error updating enrollment: " . $e->getMessage();
    }
    
    // Redirect back to the index page
    header("Location: index.php");
    exit(); // Crucial to stop the script here
}

// --- IF NOT A POST REQUEST, DISPLAY THE FORM ---

// Fetch the existing record to populate the form
$stmt = $pdo->prepare("SELECT * FROM enrollments WHERE id = ?");
$stmt->execute([$id]);
$enrollment = $stmt->fetch(PDO::FETCH_ASSOC);

// If no record was found with that ID, redirect back to the list
if (!$enrollment) {
    $_SESSION['message'] = "Error: Enrollment record not found.";
    header("Location: index.php");
    exit();
}

// Now we can set the page title and include the header
$pageTitle = "Edit Enrollment";
include '../templates/header.php';
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Enrollment</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= htmlspecialchars($id) ?>" method="post">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($enrollment['name']) ?>" required>
            </div>
            <div class="form-group">
                <label>Mobile</label>
                <input type="text" name="mobile" class="form-control" value="<?= htmlspecialchars($enrollment['mobile']) ?>" required>
            </div>
            <div class="form-group">
                <label>Education</label>
                <input type="text" name="education" class="form-control" value="<?= htmlspecialchars($enrollment['education']) ?>" required>
            </div>
            <div class="form-group">
                <label>Course</label>
                <input type="text" name="course" class="form-control" value="<?= htmlspecialchars($enrollment['course']) ?>" required>
            </div>
            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" class="form-control" value="<?= htmlspecialchars($enrollment['dob']) ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>