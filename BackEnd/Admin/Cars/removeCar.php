<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['vehicle_id'])) {
        $vehicleId = $input['vehicle_id'];

        try {
            $query = $connexion->prepare("DELETE FROM Vehicles WHERE vehicle_id = :vehicleID");
            $query->bindParam(':vehicleID', $vehicleId, PDO::PARAM_INT);
            $query->execute();

            if ($query->rowCount() > 0) {
                echo json_encode(["success" => "Vehicle removed successfully"]);
            } else {
                echo json_encode(["error" => "No such vehicle found"]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
