<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT * FROM Vehicles";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $typeQuery = "SELECT DISTINCT type FROM Vehicles";
    $typeStmt = $connexion->prepare($typeQuery);
    $typeStmt->execute();
    $types = $typeStmt->fetchAll(PDO::FETCH_ASSOC);
    
    $gasQuery = "SELECT DISTINCT type_gas FROM Vehicles";
    $gasStmt = $connexion->prepare($gasQuery);
    $gasStmt->execute();
    $gas = $gasStmt->fetchAll(PDO::FETCH_ASSOC);

    $gearQuery = "SELECT DISTINCT gear FROM Vehicles";
    $gearStmt = $connexion->prepare($gearQuery);
    $gearStmt->execute();
    $gear = $gearStmt->fetchAll(PDO::FETCH_ASSOC);

    $query = "SELECT * FROM Brands";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'data' => $vehicles,
        'types' => $types,
        'gas' => $gas,
        'gear' => $gear,
        'brands' => $brands,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des véhicules : ' . $e->getMessage()]);
}
