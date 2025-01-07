<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include ('../../Connection/connect.php');

try {
    $connexion->exec("USE drivego");

    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['reservation_id']) || !isset($data['new_status'])) {
        echo json_encode(['error' => 'Missing reservation_id or new_status']);
        exit();
    }

    $reservation_id = $data['reservation_id'];
    $new_status = $data['new_status'];

    $validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (!in_array($new_status, $validStatuses)) {
        echo json_encode(['error' => 'Invalid status value']);
        exit();
    }

    $query = "UPDATE Reservations SET status = :status WHERE reservation_id = :reservation_id";
    $stmt = $connexion->prepare($query);
    
    $stmt->bindParam(':status', $new_status);
    $stmt->bindParam(':reservation_id', $reservation_id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'message' => 'Reservation status updated successfully.'
        ]);
    } else {
        echo json_encode(['error' => 'Failed to update reservation status.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error updating status: ' . $e->getMessage()]);
}
