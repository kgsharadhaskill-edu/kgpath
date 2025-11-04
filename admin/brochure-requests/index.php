<?php
include '../config/session_check.php';
$pageTitle = "Manage Brochure Requests";
include '../config/database.php';
include '../templates/header.php';

// --- SORTING LOGIC ---

// 1. Define a whitelist of columns that are allowed to be sorted. SECURITY measure.
$allowed_sort_columns = ['id', 'course_title', 'contact_number', 'specialization', 'created_at'];

// 2. Determine the sort column. Default to 'created_at' if not set or invalid.
$sort_col = 'created_at'; // Default sort column
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
$count_stmt = $pdo->query("SELECT count(*) FROM brochure_requests");
$total_results = $count_stmt->fetchColumn();
$total_pages = ceil($total_results / $limit);
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page > $total_pages && $total_pages > 0) $page = $total_pages;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $limit;

// --- DATA FETCHING (with dynamic sorting) ---

// SQL query now uses the validated $sort_col and $sort_order variables.
$sql = "SELECT * FROM brochure_requests ORDER BY {$sort_col} {$sort_order} LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Helper variable for preserving sort order in pagination links
$sort_params = "&sort={$sort_col}&order={$sort_order}";

?>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">All Brochure Requests</h3>
        <div class="card-tools">
            <a href="create.php" class="btn btn-primary">Add New Request</a>
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
                    <?php sort_link('Course Title', 'course_title', $sort_col, $sort_order); ?>
                    <?php sort_link('Contact Number', 'contact_number', $sort_col, $sort_order); ?>
                    <?php sort_link('Specialization', 'specialization', $sort_col, $sort_order); ?>
                    <?php sort_link('Requested At', 'created_at', $sort_col, $sort_order); ?>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($requests): ?>
                    <?php foreach ($requests as $request): ?>
                    <tr>
                        <td><?= htmlspecialchars($request['id']) ?></td>
                        <td><?= htmlspecialchars($request['course_title']) ?></td>
                        <td><?= htmlspecialchars($request['contact_number']) ?></td>
                        <td><?= htmlspecialchars($request['specialization']) ?></td>
                        <td><?= htmlspecialchars(date("M d, Y h:i A", strtotime($request['created_at']))) ?></td>
                        <td>
                            <a href="edit.php?id=<?= $request['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                            <a href="delete.php?id=<?= $request['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6" class="text-center">No brochure requests found.</td>
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