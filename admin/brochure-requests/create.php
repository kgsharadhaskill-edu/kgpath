<?php
include '../config/session_check.php';
$pageTitle = "Add Brochure Request";
include '../config/database.php';
include '../templates/header.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "INSERT INTO brochure_requests (course_title, contact_number, specialization) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['course_title'], $_POST['contact_number'], $_POST['specialization']]);
    $_SESSION['message'] = "Brochure request added successfully!";
    header("Location: index.php");
    exit();
}
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">New Brochure Request Form</h3>
    </div>
    <div class="card-body">
        <form action="create.php" method="post">
            <div class="form-group">
                <label>Course Title</label>
                <input type="text" name="course_title" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact_number" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Specialization</label>
                <input type="text" name="specialization" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>