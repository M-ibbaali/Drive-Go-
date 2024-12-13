<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $query = "SELECT v.name, v.type, v.first_img, p.amount, p.payment_date FROM Vehicles v JOIN Reservations r ON v.vehicle_id = r.vehicle_id JOIN Payments p ON r.reservation_id = p.reservation_id WHERE p.status = 'Completed' ORDER BY p.payment_date DESC LIMIT 4";
    
    $stmt = $connexion->prepare($query);
    $stmt->execute();
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($transactions) {
        $formattedTransactions = array_map(function ($transaction) {
            return [
                'name' => $transaction['name'],
                'type' => $transaction['type'],
                'first_img' => $transaction['first_img'],
                'amount' => $transaction['amount'],
                'payment_date' => $transaction['payment_date'],
            ];
        }, $transactions);

        echo json_encode([
            'data' => $formattedTransactions,
            'message' => 'Last 4 completed transactions.'
        ]);
    } else {
        echo json_encode([
            'error' => 'No completed transactions found.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
