<?php

function env_or_default(string $key, string $default): string
{
    $value = getenv($key);
    return $value === false || $value === '' ? $default : $value;
}

$host = env_or_default('DB_HOST', 'mysql-117accf-marwane1gb23-c0dc.a.aivencloud.com');
$db   = env_or_default('DB_DATABASE', 'defaultdb');
$user = env_or_default('DB_USERNAME', 'avnadmin');
$pass = env_or_default('DB_PASSWORD', '');
$charset = env_or_default('DB_CHARSET', 'utf8mb4');
$port = (int) env_or_default('DB_PORT', '17211');

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
