<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

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
    $email = trim($data['email'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid email format.']);
        exit;
    }

    try {
        $query = "SELECT user_id FROM Users WHERE email = :email";
        $stmt = $connexion->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            http_response_code(404);
            echo json_encode(['message' => 'Email not found.']);
            exit;
        }

        $token = bin2hex(random_bytes(16));
        $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

        $insertQuery = "INSERT INTO PasswordResets (email, token, expires_at) VALUES (:email, :token, :expires_at)";
        $insertStmt = $connexion->prepare($insertQuery);
        $insertStmt->bindParam(":email", $email);
        $insertStmt->bindParam(":token", $token);
        $insertStmt->bindParam(":expires_at", $expiry);
        $insertStmt->execute();

        $resetLink = "http://localhost:5173/reset-password?token=$token";
        $subject = "Password Reset Request";
        $message = "Hello, \n\nClick the link below to reset your password:\n$resetLink\n\nThis link is valid for 1 hour.";

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'drive-go@gmail.com';
        $mail->Password = 'your-email-password';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('drive-go@gmail.com', 'DriveGo');
        $mail->addAddress($email);

        $mail->Subject = $subject;
        $mail->Body    = $message;

        if ($mail->send()) {
            echo json_encode(['message' => 'Password reset link sent to your email.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to send the email. Please try again later.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method.']);
}
