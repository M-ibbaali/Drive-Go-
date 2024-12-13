<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT v.type, COUNT(r.reservation_id) AS reservation_count FROM Reservations r JOIN Vehicles v ON r.vehicle_id = v.vehicle_id GROUP BY v.type ORDER BY reservation_count DESC";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $topCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($topCars) {
        $formattedCars = array_map(function ($car) {
            return [
                'type' => $car['type'],
                'reservations' => $car['reservation_count'],
            ];
        }, $topCars);

        echo json_encode([
            'data' => $formattedCars,
            'message' => 'Top 5 car types with the highest reservations.'
        ]);
    } else {
        echo json_encode([
            'error' => 'No reservation data available.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
