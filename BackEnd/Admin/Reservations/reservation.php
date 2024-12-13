<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT r.reservation_id AS id, r.start_date, r.end_date, r.status, u.full_name, v.name, v.type, v.location FROM Reservations r JOIN Users u ON r.user_id = u.user_id JOIN Vehicles v ON r.vehicle_id = v.vehicle_id ORDER BY r.reservation_id";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $reservationsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($reservationsData) {
        echo json_encode([
            'data' => $reservationsData,
            'message' => 'Reservations data fetched successfully.'
        ]);
    } else {
        echo json_encode([
            'error' => 'No Reservations data found.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
