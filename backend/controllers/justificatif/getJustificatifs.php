<?php
require_once __DIR__ . '/../../config/database.php';
header("Content-Type: application/json");

$id_mouvement = $_GET['id_mouvement'] ?? null;
if (!$id_mouvement) {
    echo json_encode(["success" => false, "message" => "ID du mouvement requis"]);
    exit;
}
$projectName = basename(dirname(dirname(dirname(__DIR__))));

$stmt = $pdo->prepare("
    SELECT * 
    FROM justificatifs 
    WHERE id_mouv = ?
    ORDER BY date_upload DESC
");
$stmt->execute([$id_mouvement]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

$data = array_map(function ($item) use ($projectName) {
    $item['download_url'] =
        '/' . $projectName . '/backend/api/justificatifApi.php?endpoint=download&id=' . $item['id_justificatif'];
    return $item;
}, $data);

echo json_encode(["success" => true, "data" => $data]);
?>
