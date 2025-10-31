<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'db.php';

try {
    $query = "SELECT icon_name, title, description, response_time, color_class, href FROM contact_methods ORDER BY id ASC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $contactMethods = [];
    foreach ($results as $row) {
        $contactMethods[] = [
            'icon' => $row['icon_name'],
            'title' => $row['title'],
            'desc' => $row['description'],
            'time' => $row['response_time'],
            'color' => $row['color_class'],
            'href' => $row['href']
        ];
    }

    http_response_code(200);
    echo json_encode($contactMethods);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
