<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request = $_GET['endpoint'] ?? '';

switch ($request) {

case "createD":
require "../controllers/demande/createD.php";
break;

case "readD":
require "../controllers/demande/readD.php";
break;

case "updateD":
require "../controllers/demande/updateD.php";
break;

case "deleteD":
require "../controllers/demande/deleteD.php";
break;

default:
echo json_encode(["error"=>"Endpoint non trouvé"]);
break;
}
