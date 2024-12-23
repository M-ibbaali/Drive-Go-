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

    if (!isset($inputData['reservation_id']) || !isset($inputData['user_id']) || !isset($inputData['rating'])) {
        echo json_encode(["error" => "Required fields are missing"]);
        exit;
    }

    $reservationID = $inputData['reservation_id'];
    $userID = $inputData['user_id'];
    $rating = $inputData['rating'];
    $comment = isset($inputData['comment']) ? $inputData['comment'] : null;

    try {
        $query = $connexion->prepare("INSERT INTO Reviews (reservation_id, user_id, rating, comment) VALUES (:reservationID, :userID, :rating, :comment)");
        $query->bindParam(':reservationID', $reservationID, PDO::PARAM_INT);
        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->bindParam(':rating', $rating, PDO::PARAM_INT);
        $query->bindParam(':comment', $comment, PDO::PARAM_STR);

        $query->execute();

        echo json_encode(["success" => true, "message" => "Review submitted successfully."]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
