<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request = $_GET['endpoint'] ?? '';

switch ($request) {

case "createA":
require "../controllers/affectation/createA.php";
break;

case "readA":
require "../controllers/affectation/readA.php";
break;

case "updateA":
require "../controllers/affectation/updateA.php";
break;

case "deleteA":
require "../controllers/affectation/deleteA.php";
break;

default:
echo json_encode(["error"=>"Endpoint non trouvé"]);
break;
}
