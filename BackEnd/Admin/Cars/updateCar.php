<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../../Connection/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['owner_id']) && isset($input['name']) && isset($input['type']) &&
        isset($input['price']) && isset($input['first_img']) && isset($input['second_img']) &&
        isset($input['third_img']) && isset($input['type_gas']) && isset($input['gas_capacity']) &&
        isset($input['gear']) && isset($input['passengers']) && isset($input['location']) && isset($input['brand_id'])) {

        $owner_id = $input['owner_id'];
        $vehicle_id = $input['vehicle_id'];
        $name = $input['name'];
        $type = $input['type'];
        $price = number_format($input['price'], 2, '.', '');
        $last_price = number_format($input['last_price'], 2, '.', '') ?? null;
        $first_img = $input['first_img'];
        $second_img = $input['second_img'];
        $third_img = $input['third_img'];
        $type_gas = $input['type_gas'];
        $gas_capacity = $input['gas_capacity'];
        $gear = $input['gear'];
        $passengers = $input['passengers'];
        $description = $input['description'] ?? null;
        $location = $input['location'];
        $brand_id = $input['brand_id'];

        try {
            $checkVehicleQuery = $connexion->prepare("SELECT owner_id FROM Vehicles WHERE vehicle_id = :vehicle_id");
            $checkVehicleQuery->bindParam(':vehicle_id', $vehicle_id, PDO::PARAM_INT);
            $checkVehicleQuery->execute();
            $vehicle = $checkVehicleQuery->fetch(PDO::FETCH_ASSOC);

            if (!$vehicle) {
                echo json_encode(["error" => "Vehicle ID does not exist."]);
                exit;
            }

            if ($vehicle['owner_id'] != $owner_id) {
                echo json_encode(["error" => "You are not authorized to update this vehicle."]);
                exit;
            }

            $query = $connexion->prepare("UPDATE Vehicles SET name = :name, type = :type, price = :price, last_price = :last_price, first_img = :first_img, second_img = :second_img, third_img = :third_img, type_gas = :type_gas, gas_capacity = :gas_capacity, gear = :gear, passengers = :passengers, description = :description, location = :location, brand_id = :brand_id WHERE vehicle_id = :vehicle_id");

            $query->bindParam(':vehicle_id', $vehicle_id, PDO::PARAM_INT);
            $query->bindParam(':name', $name, PDO::PARAM_STR);
            $query->bindParam(':type', $type, PDO::PARAM_STR);
            $query->bindParam(':price', $price, PDO::PARAM_STR);
            $query->bindParam(':last_price', $last_price, PDO::PARAM_STR);
            $query->bindParam(':first_img', $first_img, PDO::PARAM_STR);
            $query->bindParam(':second_img', $second_img, PDO::PARAM_STR);
            $query->bindParam(':third_img', $third_img, PDO::PARAM_STR);
            $query->bindParam(':type_gas', $type_gas, PDO::PARAM_STR);
            $query->bindParam(':gas_capacity', $gas_capacity, PDO::PARAM_STR);
            $query->bindParam(':gear', $gear, PDO::PARAM_STR);
            $query->bindParam(':passengers', $passengers, PDO::PARAM_INT);
            $query->bindParam(':description', $description, PDO::PARAM_STR);
            $query->bindParam(':location', $location, PDO::PARAM_STR);
            $query->bindParam(':brand_id', $brand_id, PDO::PARAM_INT);

            $query->execute();

            echo json_encode(["success" => "Car updated successfully"]);
        } catch (Exception $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
