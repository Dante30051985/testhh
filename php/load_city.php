<?php

include './db/settings.php';
include './db/db.php';

if (isset($_GET['char'])) {
    
    $char = mysqli_real_escape_string($db, (htmlspecialchars($_GET['char'])));
    $search = '%' . $char . '%';

    $query = $db->prepare('select `name_city` from `street_kladr_city` where 
                                            `name_city` LIKE ? LIMIT 20');
    $query->bind_param('s', $search);   
    $query->execute();
    $getResult = $query->get_result();
    
    $arr = [];
    while ($result = mysqli_fetch_assoc($getResult))
    {
        $arr['city'][] = $result['name_city'];
    }

    echo json_encode($arr);
}




?>