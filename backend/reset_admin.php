<?php
require_once __DIR__ . '/config/database.php';

header('Content-Type: text/plain; charset=utf-8');

$username = 'admin';
$email = 'admin@example.com';
$password = 'admin2003';
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare('SELECT id_user FROM utilisateurs WHERE email = ? OR username = ? LIMIT 1');
    $stmt->execute([$email, $username]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        $updateStmt = $pdo->prepare(
            'UPDATE utilisateurs
             SET full_name = ?, username = ?, email = ?, password = ?, role = ?
             WHERE id_user = ?'
        );
        $updateStmt->execute([
            'Admin',
            $username,
            $email,
            $hashedPassword,
            'admin',
            $existingUser['id_user'],
        ]);

        echo "Admin user updated.\n";
    } else {
        $insertStmt = $pdo->prepare(
            'INSERT INTO utilisateurs (full_name, username, email, password, role)
             VALUES (?, ?, ?, ?, ?)'
        );
        $insertStmt->execute([
            'Admin',
            $username,
            $email,
            $hashedPassword,
            'admin',
        ]);

        echo "Admin user created.\n";
    }

    echo "Login:\n";
    echo "email: admin@example.com\n";
    echo "password: admin2003\n";
    echo "Delete this file after use: backend/reset_admin.php\n";
} catch (Throwable $e) {
    http_response_code(500);
    echo 'Error: ' . $e->getMessage();
}
