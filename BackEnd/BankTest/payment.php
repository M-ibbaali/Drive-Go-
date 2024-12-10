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
        empty($inputData['user_id']) ||
        empty($inputData['account_id']) ||
        empty($inputData['amount'])
    ) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    $userID = $inputData['user_id'];
    $accountID = $inputData['account_id'];
    $amount = $inputData['amount'];
    $status = 'pending';

    $driveGoAccountID = 1;
    $driveGoAccountID = (int)$driveGoAccountID;

    try {
        $checkAccountQuery = $connexion->prepare("SELECT balance FROM Accounts WHERE account_id = :accountID AND user_id = :userID FOR UPDATE");
        $checkAccountQuery->bindParam(':accountID', $accountID, PDO::PARAM_INT);
        $checkAccountQuery->bindParam(':userID', $userID, PDO::PARAM_INT);
        $checkAccountQuery->execute();

        $account = $checkAccountQuery->fetch(PDO::FETCH_ASSOC);

        if (!$account) {
            echo json_encode(["error" => "Account not found or does not belong to the user."]);
            exit;
        }

        if ($account['balance'] < $amount) {
            echo json_encode(["error" => "Insufficient balance."]);
            exit;
        }

        $connexion->beginTransaction();

        $newBalance = $account['balance'] - $amount;
        $updateBalanceQuery = $connexion->prepare("UPDATE Accounts SET balance = :newBalance WHERE account_id = :accountID");
        $updateBalanceQuery->bindParam(':newBalance', $newBalance, PDO::PARAM_STR);
        $updateBalanceQuery->bindParam(':accountID', $accountID, PDO::PARAM_INT);
        $updateBalanceQuery->execute();

        $transactionQuery = $connexion->prepare("INSERT INTO Transactions (account_id, transaction_type, amount, status) VALUES (:accountID, 'debit', :amount, :status)");
        $transactionQuery->bindParam(':accountID', $accountID, PDO::PARAM_INT);
        $transactionQuery->bindParam(':amount', $amount, PDO::PARAM_STR);
        $transactionQuery->bindParam(':status', $status, PDO::PARAM_STR);
        $transactionQuery->execute();

        $checkDriveGoAccountQuery = $connexion->prepare("SELECT balance FROM Accounts WHERE account_id = :driveGoAccountID FOR UPDATE");
        $checkDriveGoAccountQuery->bindParam(':driveGoAccountID', $driveGoAccountID, PDO::PARAM_INT);
        $checkDriveGoAccountQuery->execute();

        $driveGoAccount = $checkDriveGoAccountQuery->fetch(PDO::FETCH_ASSOC);

        if (!$driveGoAccount) {
            echo json_encode(["error" => "DriveGo account not found."]);
            exit;
        }

        $newDriveGoBalance = $driveGoAccount['balance'] + $amount;
        $updateDriveGoBalanceQuery = $connexion->prepare("UPDATE Accounts SET balance = :newDriveGoBalance WHERE account_id = :driveGoAccountID");
        $updateDriveGoBalanceQuery->bindParam(':newDriveGoBalance', $newDriveGoBalance, PDO::PARAM_STR);
        $updateDriveGoBalanceQuery->bindParam(':driveGoAccountID', $driveGoAccountID, PDO::PARAM_INT);
        $updateDriveGoBalanceQuery->execute();

        $transactionQuery = $connexion->prepare("INSERT INTO Transactions (account_id, transaction_type, amount, status) VALUES (:driveGoAccountID, 'credit', :amount, :status)");
        $transactionQuery->bindParam(':driveGoAccountID', $driveGoAccountID, PDO::PARAM_INT);
        $transactionQuery->bindParam(':amount', $amount, PDO::PARAM_STR);
        $transactionQuery->bindParam(':status', $status, PDO::PARAM_STR);
        $transactionQuery->execute();

        $connexion->commit();

        echo json_encode(["success" => true, "transaction_id" => $connexion->lastInsertId(), "new_balance" => $newBalance]);
    } catch (Exception $e) {
        $connexion->rollBack();
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
