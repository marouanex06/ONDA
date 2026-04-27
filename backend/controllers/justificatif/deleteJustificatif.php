<?php
require_once __DIR__ . '/../../config/database.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_justificatif'])) {
    echo json_encode(["success" => false, "message" => "ID requis"]);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT nom_fichier, chemin_fichier FROM justificatifs WHERE id_justificatif = ?");
    $stmt->execute([$data['id_justificatif']]);
    $file = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$file) {
        throw new Exception("Fichier introuvable dans la base de donnÃ©es");
    }

    $uploadDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
    $filePath = file_exists($file['chemin_fichier'])
        ? $file['chemin_fichier']
        : $uploadDir . $file['chemin_fichier'];

    if (file_exists($filePath) && !unlink($filePath)) {
        throw new Exception("Impossible de supprimer le fichier physique");
    }

    $stmt = $pdo->prepare("DELETE FROM justificatifs WHERE id_justificatif = ?");
    $stmt->execute([$data['id_justificatif']]);

    if ($stmt->rowCount() === 0) {
        throw new Exception("Aucun enregistrement supprimÃ© dans la base de donnÃ©es");
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Fichier supprimÃ© avec succÃ¨s"
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la suppression : " . $e->getMessage()
    ]);
}
