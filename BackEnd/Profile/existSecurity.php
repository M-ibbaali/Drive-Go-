<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (!isset($inputData['userId'])) {
        echo json_encode(["error" => "User ID provided"]);
        exit;
    }

    $userId = $inputData['userId'];

    try {
        $emailQuery = $connexion->prepare("SELECT second_phone_number, second_email FROM Users WHERE user_id = :userId");
        $emailQuery->bindParam(':userId', $userId, PDO::PARAM_INT);
        $emailQuery->execute();
        $emailPhone = $emailQuery->fetch(PDO::FETCH_ASSOC);

        if ($emailPhone) {
            echo json_encode([
                "secondPhone" => $emailPhone['second_phone_number'],
                "secondEmail" => $emailPhone['second_email'],
            ]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
