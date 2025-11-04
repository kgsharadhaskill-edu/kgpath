<?php
include '../config/session_check.php';
include '../config/database.php';

// --- PROCESS POST REQUEST FIRST, BEFORE ANY HTML OUTPUT ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "INSERT INTO enrollments (name, mobile, education, course, dob) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([
            $_POST['name'],
            $_POST['mobile'],
            $_POST['education'],
            $_POST['course'],
            $_POST['dob']
        ]);
        $_SESSION['message'] = "Enrollment added successfully!";
    } catch (PDOException $e) {
        // Optional: Set an error message for debugging
        $_SESSION['message'] = "Error adding enrollment: " . $e->getMessage();
    }

    // Redirect back to the index page
    header("Location: index.php");
    exit(); // Crucial to stop the script here
}

$pageTitle = "Add Enrollment";
include '../templates/header.php';
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">New Enrollment Form</h3>
    </div>
    <div class="card-body">
        <form action="create.php" method="post">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Mobile</label>
                <input type="text" name="mobile" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Education</label>
                <input type="text" name="education" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Course</label>
                <input type="text" name="course" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>