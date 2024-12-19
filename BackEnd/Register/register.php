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
    $data = json_decode(file_get_contents("php://input"), true);
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['message' => 'Name is required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid email format.']);
        exit;
    }

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['message' => 'Password must be at least 6 characters long.']);
        exit;
    }

    try {
        $connexion->exec("USE drivego");
        $query = "SELECT * FROM Users WHERE email = :email";
        $stmt = $connexion->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existingUser) {
            http_response_code(409);
            echo json_encode(['message' => 'Email is already taken.']);
            exit;
        }

        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        $token = bin2hex(random_bytes(16));
        $verificationLink = "http://localhost/drive-go/BackEnd/Register/verify.php?token=$token";

        $query = "INSERT INTO Users (full_name, email, password_hash, role, verification_token) VALUES (:name, :email, :password_hash, :role, :token)";
        $stmt = $connexion->prepare($query);
        $role = 'Client';
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password_hash", $password_hash);
        $stmt->bindParam(":role", $role);
        $stmt->bindParam(":token", $token);
        $stmt->execute();

        echo json_encode(['message' => 'You’re officially part of the DriveGo family! Ready to hit the road?']);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method.']);
}
