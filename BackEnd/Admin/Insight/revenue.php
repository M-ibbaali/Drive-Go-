<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT DATE(created_at) as date, SUM(total_price) as revenue FROM Reservations GROUP BY date ORDER BY date ASC LIMIT 10";
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    
    $salesData = [];
    $profitData = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $salesData[] = $row['revenue'];
        $profitData[] = $row['revenue'] * 0.2;
    }

    $sqlCustomers = "SELECT (SELECT COUNT(*) FROM Users WHERE role = 'Client') AS customers, (SELECT COUNT(*) FROM Users WHERE role = 'Admin') AS employers";
    $stmtCustomers = $connexion->prepare($sqlCustomers);
    $stmtCustomers->execute();
    
    $customers = 0;
    $employers = 0;

    if ($row = $stmtCustomers->fetch(PDO::FETCH_ASSOC)) {
        $customers = $row['customers'];
        $employers = $row['employers'];
    }

    $sqlFeaturedCar = "SELECT name, price FROM Vehicles ORDER BY created_at DESC LIMIT 1";
    $stmtFeaturedCar = $connexion->prepare($sqlFeaturedCar);
    $stmtFeaturedCar->execute();
    
    $featuredCar = '';
    $featuredPrice = 0;

    if ($row = $stmtFeaturedCar->fetch(PDO::FETCH_ASSOC)) {
        $featuredCar = $row['name'];
        $featuredPrice = $row['price'];
    }

    $response = [
        'salesData' => $salesData,
        'profitData' => $profitData,
        'customers' => $customers,
        'employers' => $employers,
        'featuredCar' => $featuredCar,
        'featuredPrice' => $featuredPrice,
        'message' => 'Data fetched successfully.'
    ];

    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
