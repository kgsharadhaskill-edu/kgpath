<?php
include '../config/session_check.php';
$pageTitle = "Edit Brochure Request";
include '../config/database.php';
include '../templates/header.php';

$id = $_GET['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "UPDATE brochure_requests SET course_title=?, contact_number=?, specialization=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['course_title'], $_POST['contact_number'], $_POST['specialization'], $id]);
    $_SESSION['message'] = "Brochure request updated successfully!";
    header("Location: index.php");
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM brochure_requests WHERE id = ?");
$stmt->execute([$id]);
$request = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Brochure Request</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= $id ?>" method="post">
            <div class="form-group">
                <label>Course Title</label>
                <input type="text" name="course_title" class="form-control" value="<?= htmlspecialchars($request['course_title']) ?>" required>
            </div>
            <div class="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact_number" class="form-control" value="<?= htmlspecialchars($request['contact_number']) ?>" required>
            </div>
            <div class="form-group">
                <label>Specialization</label>
                <input type="text" name="specialization" class="form-control" value="<?= htmlspecialchars($request['specialization']) ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>