<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT * FROM RecommendedCars rc JOIN Vehicles v ON rc.vehicle_id = v.vehicle_id JOIN Users u ON v.owner_id = u.user_id";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $recommendedCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'data' => $recommendedCars
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des véhicules : ' . $e->getMessage()]);
}
