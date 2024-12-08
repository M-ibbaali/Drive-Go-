<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (!isset($inputData['sender_id']) || !isset($inputData['message_content']) || !isset($inputData['subject'])) {
        echo json_encode(["error" => "Required fields are missing"]);
        exit;
    }

    $senderID = $inputData['sender_id'];
    $messageContent = $inputData['message_content'];
    $subject = $inputData['subject'];

    try {
        $query = $connexion->prepare("INSERT INTO ClientMessages (user_id, subject, message_content) VALUES (:senderID, :subject, :messageContent)");
        $query->bindParam(':senderID', $senderID, PDO::PARAM_INT);
        $query->bindParam(':messageContent', $messageContent, PDO::PARAM_STR);
        $query->bindParam(':subject', $subject, PDO::PARAM_STR);

        $query->execute();

        echo json_encode(["success" => true, "message" => "Thank you for your message! We will get back to you as soon as possible."]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
