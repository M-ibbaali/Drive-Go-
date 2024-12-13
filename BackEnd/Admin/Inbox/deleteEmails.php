<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('../../Connection/connect.php');

try {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $ids = $data['ids'];

        if (!empty($ids)) {
            $placeholders = rtrim(str_repeat('?,', count($ids)), ',');
            $sql = "DELETE FROM ClientMessages WHERE message_id IN ($placeholders)";
            $stmt = $connexion->prepare($sql);
            $stmt->execute($ids);

            echo json_encode([
                'status' => 'success',
                'message' => 'Emails deleted successfully.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'No emails selected.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid request method.'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Error deleting emails: ' . $e->getMessage()
    ]);
}
