<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT * FROM RecentCars rc JOIN Vehicles v ON rc.vehicle_id = v.vehicle_id";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $recentCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([ 'data' => $recentCars]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des véhicules : ' . $e->getMessage()]);
}
