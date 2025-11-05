<?php
// --- STEP 1: All PHP logic goes at the TOP ---
include '../config/session_check.php';
include '../config/database.php';

// Check if an ID is provided in the URL and is valid
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    $_SESSION['message'] = "Error: Invalid or missing user ID.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}
$id = $_GET['id'];

// --- STEP 2: Handle the form submission (only runs on POST request) ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic server-side validation
    if (empty($_POST['username']) || empty($_POST['email'])) {
        $_SESSION['message'] = "Username and Email cannot be empty.";
        $_SESSION['message_type'] = "danger";
        header("Location: edit.php?id=" . $id);
        exit();
    }

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // This conditional logic is good and is preserved
    if (!empty($password)) {
        // If password field is not empty, hash the new password and update it
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE users SET username=?, email=?, password=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $success = $stmt->execute([$username, $email, $hashed_password, $id]);
    } else {
        // If password field is empty, do not update the password column
        $sql = "UPDATE users SET username=?, email=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $success = $stmt->execute([$username, $email, $id]);
    }

    if ($success) {
        $_SESSION['message'] = "User updated successfully!";
        $_SESSION['message_type'] = "success";
    } else {
        $_SESSION['message'] = "Failed to update user.";
        $_SESSION['message_type'] = "danger";
    }
    
    // --- STEP 3: Redirect AFTER processing ---
    header("Location: index.php");
    exit();
}

// --- STEP 4: Fetch data for the form (only runs on GET request) ---
// Note: We don't fetch the password hash to display in the form for security reasons.
$stmt = $pdo->prepare("SELECT username, email FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// If no user is found with that ID, redirect with an error message
if (!$user) {
    $_SESSION['message'] = "Error: User not found.";
    $_SESSION['message_type'] = "danger";
    header("Location: index.php");
    exit();
}

// --- STEP 5: Start sending HTML output ---
$pageTitle = "Edit User";
include '../templates/header.php';
?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Edit User</h3>
    </div>
    <div class="card-body">
        <form action="edit.php?id=<?= htmlspecialchars($id) ?>" method="post">
            <div class="form-group mb-3">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" class="form-control" value="<?= htmlspecialchars($user['username']) ?>" required>
            </div>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" class="form-control" value="<?= htmlspecialchars($user['email']) ?>" required>
            </div>
            <div class="form-group mb-3">
                <label for="password">New Password</label>
                <div class="input-group">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Leave blank to keep current password">
                    <div class="input-group-append">
                        <span class="input-group-text" id="togglePassword" style="cursor:pointer;">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>
                <small class="form-text text-muted">Enter a new password only if you want to change it.</small>
            </div>
            <button type="submit" class="btn btn-primary">Update User</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<!-- This JavaScript is perfect as-is and can stay here -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
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
    }
});
</script>

<?php include '../templates/footer.php'; ?>