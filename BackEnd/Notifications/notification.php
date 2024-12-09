<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['userID'])) {
    $userID = $_GET['userID'];

    try {
        $query = $connexion->prepare("SELECT * FROM Notifications WHERE user_id = :userID AND status = 'Unread' ORDER BY sent_at DESC");
        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->execute();

        $notifications = $query->fetchAll(PDO::FETCH_ASSOC);

        if ($notifications) {
            echo json_encode(["notifications" => $notifications]);
        } else {
            echo json_encode(["notifications" => []]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "User ID is required"]);
}
