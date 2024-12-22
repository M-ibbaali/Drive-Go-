<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../../Connection/connect.php');

if (isset($_GET['carID']) && !empty($_GET['carID'])) {
    $carID = $_GET['carID'];

    try {
        $connexion->exec("USE drivego");

        $query = $connexion->prepare("SELECT * FROM Vehicles WHERE vehicle_id = :carID");
        $query->bindParam(':carID', $carID, PDO::PARAM_INT);
        $query->execute();
        $car = $query->fetch(PDO::FETCH_ASSOC);

        if ($car) {
            echo json_encode(['data' => $car]);
        } else {
            echo json_encode(["error" => "Car not found"]);
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error retrieving vehicle data: ' . $e->getMessage()]);
    }
}
