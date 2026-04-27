<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request = $_GET['endpoint'] ?? '';

switch ($request) {
    case "createJ":
        require "../controllers/justificatif/uploadJustificatif.php";
        break;
    case "download":
        require "../controllers/justificatif/download.php";
        break;
    case "readJ":
        require "../controllers/justificatif/getJustificatifs.php";
        break;
    case "deleteJ":
        require "../controllers/justificatif/deleteJustificatif.php";
        break;
    default:
        echo json_encode(["error" => "Endpoint non trouvÃ©"]);
        break;
}
?>
