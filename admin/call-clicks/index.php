<?php
include '../config/session_check.php';
$pageTitle = "Manage Call Clicks";
include '../config/database.php';
include '../templates/header.php';

// --- SORTING LOGIC ---

// 1. Define a whitelist of columns that are allowed to be sorted. SECURITY measure.
$allowed_sort_columns = ['id', 'counselor_id', 'counselor_name', 'user_ip_address', 'click_timestamp'];

// 2. Determine the sort column. Default to 'click_timestamp' if not set or invalid.
$sort_col = 'click_timestamp'; // Default sort column
if (isset($_GET['sort']) && in_array($_GET['sort'], $allowed_sort_columns)) {
    $sort_col = $_GET['sort'];
}

// 3. Determine the sort order. Default to 'DESC'.
$sort_order = 'DESC'; // Default sort order
if (isset($_GET['order']) && strtolower($_GET['order']) == 'asc') {
    $sort_order = 'ASC';
}

// --- PAGINATION LOGIC ---

$limit = 10;
$count_stmt = $pdo->query("SELECT count(*) FROM call_clicks");
$total_results = $count_stmt->fetchColumn();
$total_pages = ceil($total_results / $limit);
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page > $total_pages && $total_pages > 0) $page = $total_pages;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $limit;

// --- DATA FETCHING (with dynamic sorting) ---

// SQL query now uses the validated $sort_col and $sort_order variables.
$sql = "SELECT * FROM call_clicks ORDER BY {$sort_col} {$sort_order} LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$clicks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Helper variable for preserving sort order in pagination links
$sort_params = "&sort={$sort_col}&order={$sort_order}";

?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">All Call Clicks</h3>
        <div class="card-tools">
            <a href="create.php" class="btn btn-primary">Add New Click</a>
        </div>
    </div>
    <div class="card-body p-0">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <?php
                    // Helper function to generate table header links
                    function sort_link($display, $column, $current_col, $current_order) {
                        $order = ($current_col == $column && $current_order == 'ASC') ? 'desc' : 'asc';
                        $icon = 'fas fa-sort';
                        if ($current_col == $column) {
                            $icon = ($current_order == 'ASC') ? 'fas fa-sort-up' : 'fas fa-sort-down';
                        }
                        echo "<th><a href=\"?sort={$column}&order={$order}\">{$display} <i class=\"{$icon}\"></i></a></th>";
                    }
                    ?>
                    <?php sort_link('ID', 'id', $sort_col, $sort_order); ?>
                    <?php sort_link('Counselor Name', 'counselor_name', $sort_col, $sort_order); ?>
                    <?php sort_link('Counselor ID', 'counselor_id', $sort_col, $sort_order); ?>
                    <?php sort_link('User IP Address', 'user_ip_address', $sort_col, $sort_order); ?>
                    <?php sort_link('Timestamp', 'click_timestamp', $sort_col, $sort_order); ?>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($clicks): ?>
                    <?php foreach ($clicks as $click): ?>
                    <tr>
                        <td><?= htmlspecialchars($click['id']) ?></td>
                        <td><?= htmlspecialchars($click['counselor_name']) ?></td>
                        <td><?= htmlspecialchars($click['counselor_id']) ?></td>
                        <td><?= htmlspecialchars($click['user_ip_address']) ?></td>
                        <td><?= htmlspecialchars(date("M d, Y h:i A", strtotime($click['click_timestamp']))) ?></td>
                        <td>
                            <a href="edit.php?id=<?= $click['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                            <a href="delete.php?id=<?= $click['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6" class="text-center">No call clicks found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <!-- Card Footer for Pagination -->
    <?php if ($total_pages > 1): ?>
    <div class="card-footer clearfix">
        <div class="float-left">
            <strong>Page <?= $page ?> of <?= $total_pages ?></strong>
        </div>
        <ul class="pagination pagination-sm m-0 float-right">
            <!-- First Page Link -->
            <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>">
                <a class="page-link" href="?page=1<?= $sort_params ?>"><i class="fas fa-angle-double-left"></i> First</a>
            </li>

            <!-- Previous Page Link -->
            <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>">
                <a class="page-link" href="<?= ($page > 1) ? '?page=' . ($page - 1) . $sort_params : '#' ?>"><i class="fas fa-angle-left"></i> Previous</a>
            </li>

            <!-- Next Page Link -->
            <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>">
                <a class="page-link" href="<?= ($page < $total_pages) ? '?page=' . ($page + 1) . $sort_params : '#' ?>">Next <i class="fas fa-angle-right"></i></a>
            </li>

            <!-- Last Page Link -->
            <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>">
                <a class="page-link" href="?page=<?= $total_pages . $sort_params ?>">Last <i class="fas fa-angle-double-right"></i></a>
            </li>
        </ul>
    </div>
    <?php endif; ?>
</div>

<?php include '../templates/footer.php'; ?>