<?php
include '../config/session_check.php';
$pageTitle = "Edit Enrollment";
include '../config/database.php';
include '../templates/header.php';

$id = $_GET['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "UPDATE enrollments SET name=?, mobile=?, education=?, course=?, dob=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['name'],
        $_POST['mobile'],
        $_POST['education'],
        $_POST['course'],
        $_POST['dob'],
        $id
    ]);
    $_SESSION['message'] = "Enrollment updated successfully!";
    header("Location: index.php");
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM enrollments WHERE id = ?");
$stmt->execute([$id]);
$enrollment = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Enrollment</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= $id ?>" method="post">
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