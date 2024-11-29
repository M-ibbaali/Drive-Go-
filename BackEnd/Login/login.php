<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();
include('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid email format.']);
        exit;
    }

    if (empty($password)) {
        http_response_code(400);
        echo json_encode(['message' => 'Password are required.']);
        exit;
    }

    try {
        $connexion->exec("USE drivego");
        $query = "SELECT * FROM Users WHERE email = :email";
        $stmt = $connexion->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result && password_verify($password, $result['password_hash'])) {
            $_SESSION['user_id'] = $result['user_id'];
            $_SESSION['role'] = $result['role'];

            if ($result['role'] == 'Admin') {
                $message = 'Hello Mr. ' . $result['nick_name'] . ', welcome back!';
            } elseif ($result['nick_name']) {
                $message = 'Welcome back Mr. '. $result['nick_name'] . ', champion! Ready to take on the road?';
            } else {
                $message = 'Welcome back , champion! Ready to take on the road?';
            }

            if (empty($result['nick_name']) || empty($result['gender']) || empty($result['address']) || empty($result['cin']) || empty($result['phone_number'])) {
                $redirectToProfile = true;
            } else {
                $redirectToProfile = false;
            }
            
            echo json_encode(['message' => $message, 'id' => $result['user_id'], 'username' => $result['nick_name'], 'role' => $result['role'], 'redirectToProfile' => $redirectToProfile]);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Invalid email or password.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method.']);
}
