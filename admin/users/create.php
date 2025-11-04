<?php
include '../config/session_check.php';
$pageTitle = "Add User";
include '../config/database.php';
include '../templates/header.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // HASH the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username, $email, $hashed_password]);
    $_SESSION['message'] = "User created successfully!";
    header("Location: index.php");
    exit();
}
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">New User Registration Form</h3>
    </div>
    <div class="card-body">
        <form action="create.php" method="post">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" class="form-control" required>
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
            <button type="submit" class="btn btn-primary">Submit</button>
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