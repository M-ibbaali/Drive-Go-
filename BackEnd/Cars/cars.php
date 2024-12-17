<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    // Get all vehicles
    $query = "SELECT * FROM Vehicles WHERE availability_status = TRUE";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

    echo json_encode([
        'data' => $vehicles,
        'types' => $types,
        'capacities' => $capacities,
        'priceRange' => $priceRange
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des véhicules : ' . $e->getMessage()]);
}
