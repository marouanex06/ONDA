<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request = $_GET['endpoint'] ?? '';

switch ($request) {

    case "ajouterC":
        require "../controllers/fourniture/ajouterC.php";
        break;

    case "readC":
        require "../controllers/fourniture/readC.php";
        break;

    case "updateC":
        require "../controllers/fourniture/updateC.php";
        break;

    case "deleteC":
        require "../controllers/fourniture/deleteC.php";
        break;

    default:
        echo json_encode(["error" => "Endpoint non trouvé"]);
        break;
}
