<?php
include './php/db/settings.php';
include './php/db/createDb.php';
include './php/db/db.php';



if (isset($_GET['reg'])) {
    include './reg.php';
} else {
    if (isset($_GET['id'])) {
   

        include './php/lk/lk_user.php';
    } else {
    
include './main.php';
}
}

?>