<?php
include '../config/session_check.php';
$pageTitle = "Edit Call Click";
include '../config/database.php';
include '../templates/header.php';

$id = $_GET['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "UPDATE call_clicks SET counselor_id=?, counselor_name=?, user_ip_address=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['counselor_id'], $_POST['counselor_name'], $_POST['user_ip_address'], $id]);
    $_SESSION['message'] = "Call click updated successfully!";
    header("Location: index.php");
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM call_clicks WHERE id = ?");
$stmt->execute([$id]);
$click = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit Call Click</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= $id ?>" method="post">
            <div class="form-group">
                <label>Counselor ID</label>
                <input type="number" name="counselor_id" class="form-control" value="<?= htmlspecialchars($click['counselor_id']) ?>" required>
            </div>
            <div class="form-group">
                <label>Counselor Name</label>
                <input type="text" name="counselor_name" class="form-control" value="<?= htmlspecialchars($click['counselor_name']) ?>" required>
            </div>
            <div class="form-group">
                <label>User IP Address</label>
                <input type="text" name="user_ip_address" class="form-control" value="<?= htmlspecialchars($click['user_ip_address']) ?>">
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>