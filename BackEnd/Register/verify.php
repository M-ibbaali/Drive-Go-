<?php
include('../Connection/connect.php');

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    try {
        $connexion->exec("USE drivego");
        $query = "SELECT * FROM Users WHERE verification_token = :token";
        $stmt = $connexion->prepare($query);
        $stmt->bindParam(":token", $token);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $updateQuery = "UPDATE Users SET email_verified = 1 WHERE verification_token = :token";
            $updateStmt = $connexion->prepare($updateQuery);
            $updateStmt->bindParam(":token", $token);
            $updateStmt->execute();

            echo json_encode(['message' => 'You’re officially part of the DriveGo family! Ready to hit the road?']);
        } else {
            echo "Invalid or expired verification token.";
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo "An error occurred. Please try again later.";
    }
} else {
    echo "No token provided.";
}
