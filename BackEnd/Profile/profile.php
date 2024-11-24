<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['userID'])) {
    $userID = $_GET['userID'];

    try {
        $query = $connexion->prepare("SELECT * FROM Users WHERE user_id = :userID");
        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->execute();

        $user = $query->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode(["data" => $user]);
        } else {
            echo json_encode(["error" => "User not found"]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (!isset($inputData['user_id'])) {
        echo json_encode(["error" => "User ID not provided"]);
        exit;
    }

    $userID = $inputData['user_id'];
    $fullName = $inputData['full_name'] ?? null;
    $nickName = $inputData['nick_name'] ?? null;
    $email = $inputData['email'] ?? null;
    $address = $inputData['address'] ?? null;
    $cin = $inputData['cin'] ?? null;
    $phoneNumber = $inputData['phone_number'] ?? null;
    $gender = $inputData['gender'] ?? null;

    try {
        $checkQuery = $connexion->prepare("SELECT COUNT(*) FROM users WHERE user_id = :userID");
        $checkQuery->bindParam(':userID', $userID, PDO::PARAM_STR);
        $checkQuery->execute();
        $userExists = $checkQuery->fetchColumn() > 0;

        if ($userExists) {
            $query = $connexion->prepare(
                "UPDATE users SET
                    full_name = COALESCE(:fullName, full_name),
                    nick_name = COALESCE(:nickName, nick_name),
                    email = COALESCE(:email, email),
                    address = COALESCE(:address, address),
                    cin = COALESCE(:cin, cin),
                    phone_number = COALESCE(:phoneNumber, phone_number),
                    gender = COALESCE(:gender, gender)
                WHERE user_id = :userID
            ");
        }

        $query->bindParam(':userID', $userID, PDO::PARAM_STR);
        $query->bindParam(':fullName', $fullName);
        $query->bindParam(':nickName', $nickName);
        $query->bindParam(':email', $email);
        $query->bindParam(':address', $address);
        $query->bindParam(':cin', $cin);
        $query->bindParam(':phoneNumber', $phoneNumber);
        $query->bindParam(':gender', $gender);

        $query->execute();

        echo json_encode(["success" => true, "message" => "User data updated successfully"]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "User ID not provided"]);
}
