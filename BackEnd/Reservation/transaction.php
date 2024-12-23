<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../Connection/bankConnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (
        empty($inputData['account_number']) ||
        empty($inputData['amount'])
    ) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    $accountNumber = $inputData['account_number'];
    $amount = $inputData['amount'];

    try {
        $accountQuery = $connexion->prepare("SELECT account_id, balance FROM Accounts WHERE account_number = :accountNumber");
        $accountQuery->bindParam(':accountNumber', $accountNumber, PDO::PARAM_STR);
        $accountQuery->execute();

        $account = $accountQuery->fetch(PDO::FETCH_ASSOC);

        if (!$account) {
            echo json_encode(["error" => "Account not found."]);
            exit;
        }

        $account_id = $account['account_id'];
        $clientBalance = $account['balance'];

        if ($amount < 0 && abs($amount) > $clientBalance) {
            echo json_encode(["error" => "Insufficient funds."]);
            exit;
        }

        $driveGo ='222233334444';
        $driveGoQuery = $connexion->prepare("SELECT balance FROM Accounts WHERE account_number = :driveGo");
        $driveGoQuery->bindParam(':driveGo', $driveGo, PDO::PARAM_STR);
        $driveGoQuery->execute();
        $driveGoAccount = $driveGoQuery->fetch(PDO::FETCH_ASSOC);

        $driveGoBalance = $driveGoAccount['balance'];

        $newBalance = $driveGoBalance + $amount;
        $updateQuery = $connexion->prepare("UPDATE Accounts SET balance = :newBalance WHERE account_number = :driveGo");
        $updateQuery->bindParam(':newBalance', $newBalance, PDO::PARAM_STR);
        $updateQuery->bindParam(':driveGo', $driveGo, PDO::PARAM_STR);
        $updateQuery->execute();

        $newBalance = $clientBalance - $amount;
        $updateQuery = $connexion->prepare("UPDATE Accounts SET balance = :newBalance WHERE account_number = :accountNumber");
        $updateQuery->bindParam(':newBalance', $newBalance, PDO::PARAM_STR);
        $updateQuery->bindParam(':accountNumber', $accountNumber, PDO::PARAM_STR);
        $updateQuery->execute();

        $transactionQuery = $connexion->prepare("INSERT INTO Transactions (account_id, amount) VALUES (:account_id, :amount)");
        $transactionQuery->bindParam(':account_id', $account_id, PDO::PARAM_INT);
        $transactionQuery->bindParam(':amount', $amount, PDO::PARAM_STR);
        $transactionQuery->execute();

        echo json_encode([
            "success" => true,
        ]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
