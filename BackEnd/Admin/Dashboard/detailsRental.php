<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT r.reservation_id, v.name, v.type, v.first_img, v.location, r.start_date, r.end_date, r.total_price, r.status FROM Reservations r JOIN Vehicles v ON r.vehicle_id = v.vehicle_id WHERE r.status = 'Pending' ORDER BY r.created_at DESC LIMIT 1";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $reservation = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $request = "SELECT DISTINCT location FROM Vehicles GROUP BY location";
    $result = $connexion->prepare($request);
    $result->execute();
    $location = $result->fetchAll(PDO::FETCH_ASSOC);

    if ($reservation && $location) {
        $carDetails = [
            'reservationId' => $reservation['reservation_id'],
            'name' => $reservation['name'],
            'type' => $reservation['type'],
            'image' => $reservation['first_img'],
            'location' => $reservation['location'],
            'pickUp' => $reservation['start_date'],
            'DropOff' => $reservation['end_date'],
            'price' => $reservation['total_price'],
            'status' => $reservation['status'],
        ];

        echo json_encode([
            'data' => $carDetails,
            'cities' => $location,
            'message' => 'Last Pending Rental'
        ]);
    } else {
        echo json_encode([
            'error' => 'No pending rentals found.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching rental details: ' . $e->getMessage()]);
}
