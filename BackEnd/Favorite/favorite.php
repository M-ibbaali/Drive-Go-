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
        $query = $connexion->prepare("SELECT Vehicles.* FROM Favorites INNER JOIN Vehicles ON Favorites.vehicle_id = Vehicles.vehicle_id WHERE Favorites.user_id = :userID");
        $query->bindParam(':userID', $userID, PDO::PARAM_INT);
        $query->execute();

        $favorites = $query->fetchAll(PDO::FETCH_ASSOC);

        if ($favorites) {
            echo json_encode(["data" => $favorites]);
        } else {
            echo json_encode(["error" => "No favorite vehicles found for this user"]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
