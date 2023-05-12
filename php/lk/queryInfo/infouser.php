<?php
include_once '../../db/settings.php';
include_once '../../db/db.php';


if (isset($_GET['iduser'])) {

    $query = $db->prepare('SELECT * FROM `us_testhh` where `id` = ?');
    $query->bind_param('i', $_GET['iduser']);
    $query->execute();
    $getResult = $query->get_result();
    $result = $getResult->fetch_array();
    echo json_encode($result);
}


?>