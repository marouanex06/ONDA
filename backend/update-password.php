<?php
require_once __DIR__ . '/config/database.php';

$newHash = '$2y$10$OixZaYtSYuJl/7fAKFOccuU3sHTN1Jex3cOuPVW63E4k.DXdDLs2m'; // Hash for "admin123"

try {
    $stmt = $pdo->prepare('UPDATE utilisateurs SET password = ? WHERE email = ?');
    $result = $stmt->execute([$newHash, 'admin@example.com']);
    
    echo json_encode([
        'success' => $result,
        'message' => 'Password updated for admin@example.com',
        'credentials' => [
            'email' => 'admin@example.com',
            'password' => 'admin123'
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
