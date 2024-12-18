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

    if (!isset($inputData['userId']) || !isset($inputData['secondEmail']) || !isset($inputData['secondPhoneNumber'])) {
        echo json_encode(["error" => "User ID, second email, or second phone number not provided"]);
        exit;
    }

    $userId = $inputData['userId'];
    $secondEmail = $inputData['secondEmail'];
    $secondPhoneNumber = $inputData['secondPhoneNumber'];

    try {
        $emailQuery = $connexion->prepare("SELECT user_id, second_email FROM Users WHERE second_email = :secondEmail AND user_id != :userId");
        $emailQuery->bindParam(':secondEmail', $secondEmail, PDO::PARAM_STR);
        $emailQuery->bindParam(':userId', $userId, PDO::PARAM_INT);
        $emailQuery->execute();
        $emailExists = $emailQuery->fetch(PDO::FETCH_ASSOC);

        $phoneQuery = $connexion->prepare("SELECT user_id, second_phone_number FROM Users WHERE second_phone_number = :secondPhoneNumber AND user_id != :userId");
        $phoneQuery->bindParam(':secondPhoneNumber', $secondPhoneNumber, PDO::PARAM_STR);
        $phoneQuery->bindParam(':userId', $userId, PDO::PARAM_INT);
        $phoneQuery->execute();
        $phoneExists = $phoneQuery->fetch(PDO::FETCH_ASSOC);

        if ($emailExists) {
            echo json_encode([
                "error" => "Second email already in use by another user",
                "existingSecondEmail" => $emailExists['second_email']
            ]);
            exit;
        }

        if ($phoneExists) {
            echo json_encode([
                "error" => "Second phone number already in use by another user",
                "existingSecondPhoneNumber" => $phoneExists['second_phone_number']
            ]);
            exit;
        }

        $updateQuery = $connexion->prepare("UPDATE Users SET second_email = :secondEmail, second_phone_number = :secondPhoneNumber WHERE user_id = :userId");
        $updateQuery->bindParam(':secondEmail', $secondEmail);
        $updateQuery->bindParam(':secondPhoneNumber', $secondPhoneNumber);
        $updateQuery->bindParam(':userId', $userId, PDO::PARAM_INT);
        $updateQuery->execute();

        echo json_encode(["success" => true, "message" => "Second email and phone number updated successfully"]);

    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
