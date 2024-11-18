<?php
    $host = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'DriveGo';

    try {
        $connexion = new PDO("mysql:host = $host; dbname = $dbname", $username, $password);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (Exception $e) {
        echo "erreur lors de la connexion a la bas de donnees : ". $e->getMessage();
    }
?>
