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
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['user_id']) && isset($input['vehicle_id'])) {
        $userId = $input['user_id'];
        $vehicleId = $input['vehicle_id'];

        try {
            $query = $connexion->prepare("INSERT INTO Favorites (user_id, vehicle_id) VALUES (:userID, :vehicleID)");
            $query->bindParam(':userID', $userId, PDO::PARAM_INT);
            $query->bindParam(':vehicleID', $vehicleId, PDO::PARAM_INT);
            $query->execute();

            echo json_encode(["success" => "Favorite vehicle added successfully"]);
        } catch (Exception $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
