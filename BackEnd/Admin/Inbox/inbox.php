<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT u.full_name, cm.message_id, cm.subject, cm.sent_at, cm.status, cm.message_content FROM Users u JOIN ClientMessages cm ON u.user_id = cm.user_id ORDER BY cm.sent_at DESC";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $messagesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($messagesData) {
        echo json_encode([
            'data' => $messagesData,
            'message' => 'Client messages fetched successfully.'
        ]);
    } else {
        echo json_encode([
            'error' => 'No client messages found.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
