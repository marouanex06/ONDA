<?php
/**
 * Database Setup Script
 * This script imports the SQL schema and creates the database
 */

// Database connection parameters
$host = '127.0.0.1';
$user = 'root';
$pass = '';
$port = 3306;

try {
    // Connect to MySQL without selecting a database
    $pdo = new PDO(
        "mysql:host=$host;port=$port;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Read the SQL file
    $sqlFile = __DIR__ . '/bbd/bbd.sql';
    if (!file_exists($sqlFile)) {
        die(json_encode([
            'success' => false,
            'message' => "SQL file not found at: $sqlFile"
        ]));
    }

    $sqlContent = file_get_contents($sqlFile);

    // Split by semicolon and execute each statement
    $statements = array_filter(
        array_map('trim', explode(';', $sqlContent)),
        fn($stmt) => !empty($stmt) && !str_starts_with(trim($stmt), '--')
    );

    foreach ($statements as $statement) {
        if (!empty(trim($statement))) {
            $pdo->exec($statement . ';');
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Database created and tables imported successfully!',
        'credentials' => [
            'email' => 'admin@example.com',
            'password' => 'admin123'
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
