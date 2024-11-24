<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../Connection/connect.php');

if (isset($_GET['carID']) && !empty($_GET['carID'])) {
    $carID = $_GET['carID'];

    try {
        $connexion->exec("USE drivego");

        // Get Reviews for Specifique vehicle
        $query = $connexion->prepare("SELECT * FROM Reviews r JOIN Reservations res ON r.reservation_id = res.reservation_id JOIN Vehicles v ON res.vehicle_id = v.vehicle_id WHERE v.vehicle_id = :carID");
        $query->bindParam(':carID', $carID, PDO::PARAM_INT);
        $query->execute();
        $reviews = $query->fetchAll(PDO::FETCH_ASSOC);


        if ($reviews) {
            echo json_encode(['data' => $reviews]);
        } else {
            echo json_encode(["error" => "No Car Review found"]);
        }
    
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error retrieving reviews: ' . $e->getMessage()]);
    } 
}