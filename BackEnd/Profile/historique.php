<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include ('../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['userID'])) {
    $userID = $_GET['userID'];

    try {
        $query = $connexion->prepare("SELECT r.reservation_id, r.start_date, r.end_date, r.status, r.total_price, v.name AS vehicle_name, v.type AS vehicle_type FROM Reservations r INNER JOIN Vehicles v ON r.vehicle_id = v.vehicle_id WHERE r.user_id = :userID ORDER BY r.start_date DESC");
        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->execute();

        $reservations = $query->fetchAll(PDO::FETCH_ASSOC);

        if ($reservations) {
            echo json_encode(["reservations" => $reservations]);
        } else {
            echo json_encode(["reservations" => []]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "User ID is required"]);
}
