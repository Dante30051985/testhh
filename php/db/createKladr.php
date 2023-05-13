<?php
include './settings.php';
include './db.php';

if (isset($_POST)) {
    $street = (file_get_contents('php://input'));
    $exp = explode(',', $street);

    for ($i = 0; $i < count($exp); $i++) {    
        $query = $db->prepare('INSERT INTO `street_kladr_city` 
        (`id`, `name_city`) VALUES 
        (NULL, ?)');

                            $query->bind_param('s',
                            $exp[$i]);
                            $query->execute();

    }
}






?>  