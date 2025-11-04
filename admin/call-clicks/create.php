<?php
include '../config/session_check.php';
$pageTitle = "Add Call Click";
include '../config/database.php';
include '../templates/header.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "INSERT INTO call_clicks (counselor_id, counselor_name, user_ip_address) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['counselor_id'], $_POST['counselor_name'], $_POST['user_ip_address']]);
    $_SESSION['message'] = "Call click added successfully!";
    header("Location: index.php");
    exit();
}
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">New Call Click Form</h3>
    </div>
    <div class="card-body">
        <form action="create.php" method="post">
            <div class="form-group">
                <label>Counselor ID</label>
                <input type="number" name="counselor_id" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Counselor Name</label>
                <input type="text" name="counselor_name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>User IP Address</label>
                <input type="text" name="user_ip_address" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../templates/footer.php'; ?>