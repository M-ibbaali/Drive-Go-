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
        
        $ownerId = $input['owner_id'];
        $name = $input['name'];
        $type = $input['type'];
        $price = number_format($input['price'], 2, '.', '');
        $last_price = number_format($input['last_price'], 2, '.', '') ?? null;
        $firstImg = $input['first_img'];
        $secondImg = $input['second_img'];
        $thirdImg = $input['third_img'];
        $typeGas = $input['type_gas'];
        $gasCapacity = $input['gas_capacity'];
        $gear = $input['gear'];
        $passengers = $input['passengers'];
        $description = $input['description'] ?? null;
        $location = $input['location'];
        $brandId = $input['brand_id'];

        try {
            $checkOwnerQuery = $connexion->prepare("SELECT 1 FROM users WHERE user_id = :ownerId");
            $checkOwnerQuery->bindParam(':ownerId', $ownerId, PDO::PARAM_INT);
            $checkOwnerQuery->execute();
            $ownerExists = $checkOwnerQuery->fetchColumn();

            if (!$ownerExists) {
                echo json_encode(["error" => "Owner ID does not exist."]);
                exit;
            }
            $checkBrandQuery = $connexion->prepare("SELECT 1 FROM Brands WHERE brand_id = :brandId");
            $checkBrandQuery->bindParam(':brandId', $brandId, PDO::PARAM_INT);
            $checkBrandQuery->execute();
            $brandExists = $checkBrandQuery->fetchColumn();

            if (!$brandExists) {
                echo json_encode(["error" => "Brand ID does not exist."]);
                exit;
            }
            $query = $connexion->prepare("INSERT INTO Vehicles (owner_id, name, type, price, last_price, first_img, second_img, third_img, type_gas, gas_capacity, gear, passengers, description, location, brand_id) VALUES (:ownerID, :name, :type, :price, :last_price, :firstImg, :secondImg, :thirdImg, :typeGas, :gasCapacity, :gear, :passengers, :description, :location, :brandID)");
            
            $query->bindParam(':ownerID', $ownerId, PDO::PARAM_INT);
            $query->bindParam(':name', $name, PDO::PARAM_STR);
            $query->bindParam(':type', $type, PDO::PARAM_STR);
            $query->bindParam(':price', $price, PDO::PARAM_STR);
            $query->bindParam(':last_price', $last_price, PDO::PARAM_STR);
            $query->bindParam(':firstImg', $firstImg, PDO::PARAM_STR);
            $query->bindParam(':secondImg', $secondImg, PDO::PARAM_STR);
            $query->bindParam(':thirdImg', $thirdImg, PDO::PARAM_STR);
            $query->bindParam(':typeGas', $typeGas, PDO::PARAM_STR);
            $query->bindParam(':gasCapacity', $gasCapacity, PDO::PARAM_STR);
            $query->bindParam(':gear', $gear, PDO::PARAM_STR);
            $query->bindParam(':passengers', $passengers, PDO::PARAM_INT);
            $query->bindParam(':description', $description, PDO::PARAM_STR);
            $query->bindParam(':location', $location, PDO::PARAM_STR);
            $query->bindParam(':brandID', $brandId, PDO::PARAM_INT);
            
            $query->execute();

            echo json_encode(["success" => "Car added successfully"]);
        } catch (Exception $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
