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
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (
        empty($inputData['user_id']) ||
        empty($inputData['vehicle_id']) ||
        empty($inputData['start_date']) ||
        empty($inputData['end_date']) ||
        empty($inputData['total_price'])
    ) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    $userID = $inputData['user_id'];
    $vehicleID = $inputData['vehicle_id'];
    $startDate = $inputData['start_date'];
    $endDate = $inputData['end_date'];
    $totalPrice = $inputData['total_price'];
    $status = 'Pending';

    try {
        $query = $connexion->prepare("INSERT INTO Reservations (user_id, vehicle_id, start_date, end_date, status, total_price) VALUES (:userID, :vehicleID, :startDate, :endDate, :status, :totalPrice)");

        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->bindParam(':vehicleID', $vehicleID, PDO::PARAM_INT);
        $query->bindParam(':startDate', $startDate, PDO::PARAM_STR);
        $query->bindParam(':endDate', $endDate, PDO::PARAM_STR);
        $query->bindParam(':status', $status, PDO::PARAM_STR);
        $query->bindParam(':totalPrice', $totalPrice, PDO::PARAM_STR);
        $query->execute();

        $reservationID = $connexion->lastInsertId();
        if (!$reservationID) {
            echo json_encode(["error" => "Failed to create reservation."]);
            exit;
        }

        $updateQuery = $connexion->prepare("UPDATE Vehicles SET availability_status = FALSE WHERE vehicle_id = :vehicleID");
        $updateQuery->bindParam(':vehicleID', $vehicleID, PDO::PARAM_INT);
        $updateQuery->execute();

        echo json_encode(["success" => true, "reservation_id" => $reservationID]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
