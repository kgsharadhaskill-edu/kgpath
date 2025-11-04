<?php
include '../config/session_check.php';
$pageTitle = "Edit User";
include '../config/database.php';
include '../templates/header.php';

$id = $_GET['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($password)) {
        // If password field is not empty, update it
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE users SET username=?, email=?, password=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $hashed_password, $id]);
    } else {
        // If password field is empty, do not update it
        $sql = "UPDATE users SET username=?, email=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $id]);
    }

    $_SESSION['message'] = "User updated successfully!";
    header("Location: index.php");
    exit();
}

$stmt = $pdo->prepare("SELECT username, email FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit User</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= $id ?>" method="post">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?= htmlspecialchars($user['username']) ?>" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($user['email']) ?>" required>
            </div>
            <div class="form-group">
                <label>New Password</label>
                <div class="input-group">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Leave blank to keep current password">
                    <div class="input-group-append">
                        <span class="input-group-text" id="togglePassword" style="cursor:pointer;">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>
<script>
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const icon = this.querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});
</script>

<?php include '../templates/footer.php'; ?>