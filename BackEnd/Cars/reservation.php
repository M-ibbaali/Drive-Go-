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

        // Get Specifique vehicle
        $query = $connexion->prepare("SELECT * FROM Vehicles WHERE vehicle_id = :carID");
        $query->bindParam(':carID', $carID, PDO::PARAM_INT);
        $query->execute();
        $car = $query->fetchAll(PDO::FETCH_ASSOC);

        // Get distinct vehicle types
        $typeQuery = "SELECT DISTINCT type FROM Vehicles";
        $typeStmt = $connexion->prepare($typeQuery);
        $typeStmt->execute();
        $types = $typeStmt->fetchAll(PDO::FETCH_ASSOC);

        // Get distinct capacities
        $capacityQuery = "SELECT DISTINCT passengers FROM Vehicles ORDER BY passengers";
        $capacityStmt = $connexion->prepare($capacityQuery);
        $capacityStmt->execute();
        $capacities = $capacityStmt->fetchAll(PDO::FETCH_ASSOC);

        // Get price range
        $priceQuery = "SELECT MIN(price) as min_price, MAX(price) as max_price FROM Vehicles";
        $priceStmt = $connexion->prepare($priceQuery);
        $priceStmt->execute();
        $priceRange = $priceStmt->fetch(PDO::FETCH_ASSOC);

        if ($car) {
            echo json_encode([
                'data' => $car,
                'types' => $types,
                'capacities' => $capacities,
                'priceRange' => $priceRange
            ]);
        } else {
            echo json_encode(["error" => "Car not found"]);
        }
    
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de la récupération des véhicules : ' . $e->getMessage()]);
    }    
}
