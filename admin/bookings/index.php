<?php
include '../config/session_check.php';
$pageTitle = "Manage Bookings";
include '../config/database.php';
include '../templates/header.php';

// --- SORTING & PAGINATION LOGIC ---
// ✅ UPDATE: Add 'name' and 'phone_number' to the list of allowed sortable columns
$allowed_sort_columns = ['id', 'name', 'phone_number', 'booking_date', 'booking_time', 'created_at'];
$sort_col = 'created_at';
if (isset($_GET['sort']) && in_array($_GET['sort'], $allowed_sort_columns)) {
    $sort_col = $_GET['sort'];
}
$sort_order = 'DESC';
if (isset($_GET['order']) && strtolower($_GET['order']) == 'asc') {
    $sort_order = 'ASC';
}
$limit = 10;
$count_stmt = $pdo->query("SELECT count(*) FROM bookings");
$total_results = $count_stmt->fetchColumn();
$total_pages = ceil($total_results / $limit);
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page > $total_pages && $total_pages > 0) $page = $total_pages;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $limit;

// --- DATA FETCHING ---
// The `SELECT *` query automatically includes the new columns, so no change is needed here.
$sql = "SELECT * FROM bookings ORDER BY {$sort_col} {$sort_order} LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', 'offset', PDO::PARAM_INT);
$stmt->execute();
$bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
$sort_params = "&sort={$sort_col}&order={$sort_order}";

// Initialize the sequential row number counter
$row_number = ($page - 1) * $limit + 1;
?>

<div class="card">
    <form action="bulk_delete.php" method="post" onsubmit="return confirm('Are you sure you want to delete the selected items?');">
        <div class="card-header">
            <h3 class="card-title">All Bookings</h3>
            <div class="card-tools">
                <button type="submit" id="deleteSelectedBtn" class="btn btn-danger btn-sm" disabled>
                    <i class="fas fa-trash"></i> Delete Selected
                </button>
                <a href="export_excel.php" class="btn btn-success btn-sm">
                    <i class="fas fa-file-excel"></i> Export to Excel
                </a>
                <a href="create.php" class="btn btn-primary btn-sm">
                    <i class="fas fa-plus"></i> Add New Booking
                </a>
            </div>
        </div>
        <div class="card-body p-0">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px;"><input type="checkbox" id="selectAll"></th>
                        <?php
                        function sort_link($display, $column, $current_col, $current_order) {
                            $order = ($current_col == $column && $current_order == 'ASC') ? 'desc' : 'asc';
                            $icon = 'fas fa-sort';
                            if ($current_col == $column) {
                                $icon = ($current_order == 'ASC') ? 'fas fa-sort-up' : 'fas fa-sort-down';
                            }
                            echo "<th><a href=\"?sort={$column}&order={$order}\">{$display} <i class=\"{$icon}\"></i></a></th>";
                        }
                        ?>
                        <!-- Display '#' but still sort by the actual 'id' column -->
                        <?php sort_link('#', 'id', $sort_col, $sort_order); ?>
                        
                        <!-- ✅ UPDATE: Add sortable headers for Name and Phone Number -->
                        <?php sort_link('Name', 'name', $sort_col, $sort_order); ?>
                        <?php sort_link('Phone Number', 'phone_number', $sort_col, $sort_order); ?>
                        
                        <?php sort_link('Booking Date', 'booking_date', $sort_col, $sort_order); ?>
                        <?php sort_link('Booking Time', 'booking_time', $sort_col, $sort_order); ?>
                        <?php sort_link('Created At', 'created_at', $sort_col, $sort_order); ?>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($bookings): ?>
                        <?php foreach ($bookings as $booking): ?>
                        <tr>
                            <td><input type="checkbox" name="ids[]" class="row-checkbox" value="<?= $booking['id'] ?>"></td>
                            <!-- Display the sequential row number -->
                            <td><?= $row_number ?></td>
                            
                            <!-- ✅ UPDATE: Display Name and Phone Number data -->
                            <td><?= htmlspecialchars($booking['name']) ?></td>
                            <td><?= htmlspecialchars($booking['phone_number']) ?></td>

                            <td><?= htmlspecialchars(date("M d, Y", strtotime($booking['booking_date']))) ?></td>
                            <td><?= htmlspecialchars($booking['booking_time']) ?></td>
                            <td><?= htmlspecialchars(date("M d, Y h:i A", strtotime($booking['created_at']))) ?></td>
                            <td>
                                <a href="edit.php?id=<?= $booking['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                                <a href="delete.php?id=<?= $booking['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</a>
                            </td>
                        </tr>
                        <?php $row_number++; // Increment the counter for the next row ?>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <!-- ✅ UPDATE: colspan is now 8 to account for the two new columns -->
                            <td colspan="8" class="text-center">No bookings found.</td>
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
                <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>">
                    <a class="page-link" href="?page=1<?= $sort_params ?>"><i class="fas fa-angle-double-left"></i> First</a>
                </li>
                <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>">
                    <a class="page-link" href="<?= ($page > 1) ? '?page=' . ($page - 1) . $sort_params : '#' ?>"><i class="fas fa-angle-left"></i> Previous</a>
                </li>
                <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>">
                    <a class="page-link" href="<?= ($page < $total_pages) ? '?page=' . ($page + 1) . $sort_params : '#' ?>">Next <i class="fas fa-angle-right"></i></a>
                </li>
                <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>">
                    <a class="page-link" href="?page=<?= $total_pages . $sort_params ?>">Last <i class="fas fa-angle-double-right"></i></a>
                </li>
            </ul>
        </div>
        <?php endif; ?>
    </form>
</div>

<?php include '../templates/footer.php'; ?>

<!-- The Javascript for bulk delete does not need any changes -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const deleteButton = document.getElementById('deleteSelectedBtn');

    function toggleDeleteButton() {
        const anyChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
        deleteButton.disabled = !anyChecked;
    }

    selectAllCheckbox.addEventListener('change', function() {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        toggleDeleteButton();
    });

    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            } else {
                const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                selectAllCheckbox.checked = allChecked;
            }
            toggleDeleteButton();
        });
    });

    toggleDeleteButton();
});
</script>