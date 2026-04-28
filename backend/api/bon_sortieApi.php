<?php
require __DIR__ . '/cors.php';

$request = $_GET['endpoint'] ?? '';

switch ($request) {
    case "createBS":
        require "../controllers/bon_sortie/createBS.php";
        break;

    case "readBS":
        require "../controllers/bon_sortie/readBS.php";
        break;

    case "updateBS":
        require "../controllers/bon_sortie/updateBS.php";
        break;

    case "deleteBS":
        require "../controllers/bon_sortie/deleteBS.php";
        break;

    default:
        echo json_encode(["error"=>"Endpoint non trouvé"]);
        break;
}
