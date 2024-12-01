<?php
include('../Connection/connect.php');

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $token = $data['token'] ?? '';
    $password = $data['password'] ?? '';

    if (!$token || !$password) {
        http_response_code(400);
        echo json_encode(['message' => 'Token and password are required.']);
        exit;
    }

    try {
        $query = "SELECT email, expires_at FROM PasswordResets WHERE token = :token";
        $stmt = $connexion->prepare($query);
        $stmt->bindParam(":token", $token);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid or expired token.']);
            exit;
        }

        $expiry = new DateTime($result['expires_at']);
        $now = new DateTime();
        if ($now > $expiry) {
            http_response_code(400);
            echo json_encode(['message' => 'Token has expired.']);
            exit;
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $updateQuery = "UPDATE Users SET password = :password WHERE email = :email";
        $updateStmt = $connexion->prepare($updateQuery);
        $updateStmt->bindParam(":password", $hashedPassword);
        $updateStmt->bindParam(":email", $result['email']);
        $updateStmt->execute();

        $deleteQuery = "DELETE FROM PasswordResets WHERE token = :token";
        $deleteStmt = $connexion->prepare($deleteQuery);
        $deleteStmt->bindParam(":token", $token);
        $deleteStmt->execute();

        echo json_encode(['message' => 'Password reset successful.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method.']);
}
