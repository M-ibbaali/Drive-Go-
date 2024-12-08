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

    if (!isset($inputData['userId']) || !isset($inputData['oldPassword']) || !isset($inputData['newPassword'])) {
        echo json_encode(["error" => "User ID, old password, or new password not provided"]);
        exit;
    }

    $userId = $inputData['userId'];
    $oldPassword = $inputData['oldPassword'];
    $newPassword = $inputData['newPassword'];

    try {
        $query = $connexion->prepare("SELECT password_hash FROM Users WHERE user_id = :userId");
        $query->bindParam(':userId', $userId, PDO::PARAM_INT);
        $query->execute();

        $user = $query->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(["error" => "User not found"]);
            exit;
        }

        if (!password_verify($oldPassword, $user['password_hash'])) {
            echo json_encode(["error" => "Old password is incorrect"]);
            exit;
        }

        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

        $updateQuery = $connexion->prepare("UPDATE Users SET password_hash = :newPassword WHERE user_id = :userId");
        $updateQuery->bindParam(':newPassword', $newPasswordHash);
        $updateQuery->bindParam(':userId', $userId, PDO::PARAM_INT);
        $updateQuery->execute();

        echo json_encode(["success" => true, "message" => "Password updated successfully"]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
