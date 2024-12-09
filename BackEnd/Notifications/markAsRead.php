<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['notificationId'])) {
    $notificationId = $_POST['notificationId'];

    try {
        $query = $connexion->prepare("UPDATE Notifications SET status = 'Read' WHERE notification_id = :notificationId");
        $query->bindParam(':notificationId', $notificationId, PDO::PARAM_INT);
        $query->execute();

        if ($query->rowCount() > 0) {
            echo json_encode(["success" => "Notification marked as read"]);
        } else {
            echo json_encode(["error" => "Notification not found or already marked as read"]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Notification ID is required"]);
}
