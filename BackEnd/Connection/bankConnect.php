<?php
    $host = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'BankTest';

    try {
        $connexion = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $connexion->query("SHOW VARIABLES LIKE 'port'");
        $portData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($portData && isset($portData['Value'])) {
            $mysqlPort = $portData['Value'];

            $connexion = new PDO("mysql:host=$host;port=$mysqlPort;dbname=$dbname", $username, $password);
            $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    }
    catch (Exception $e) {
        echo "erreur lors de la connexion a la bas de donnees : ". $e->getMessage();
    }
