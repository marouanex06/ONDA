<?php
$host = 'mysql-117accf-marwane1gb23-c0dc.a.aivencloud.com';
$db   = 'defaultdb';
$user = 'avnadmin';
$pass = ' ';
$charset = 'utf8mb4';
$port = 17211;

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données: ' . $e->getMessage()]);
    exit;
}
