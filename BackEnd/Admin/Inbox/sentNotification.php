<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (!isset($inputData['user_id']) || !isset($inputData['message']) || !isset($inputData['message_id'])) {
        echo json_encode(["error" => "Required fields are missing"]);
        exit;
    }

    $userID = $inputData['user_id'];
    $message = $inputData['message'];
    $messageID = $inputData['message_id'];

    try {
        $query = $connexion->prepare("INSERT INTO Notifications (user_id, message) VALUES (:userID, :message)");
        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->bindParam(':message', $message, PDO::PARAM_STR);
        $query->execute();

        $updateQuery = $connexion->prepare("UPDATE ClientMessages SET status = 'Replied' WHERE message_id = :messageID");
        $updateQuery->bindParam(':messageID', $messageID, PDO::PARAM_INT);
        $updateQuery->execute();

        echo json_encode(["success" => true, "message" => "Notification sent successfully."]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
