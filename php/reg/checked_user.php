<?php   

function checked_user($db, $email, $login) {
  
    $checkedLogin = checkedLogin($db, $login);

    if ($checkedLogin != null) {
        echo json_encode('error_login');
    } else {
        $checkedEmail = checkedEmail($db, $email);
        if ($checkedEmail != null) {
            echo json_encode('error_email');    
        } else {
            return true;
        }
    }
}

function checkedEmail($db, $email) {
    $query = $db->prepare('SELECT * FROM `us_testhh` WHERE `email` = ?');
    $query->bind_param('s', $email);
    $query->execute();
    $getResult = $query->get_result();
    $result = $getResult->fetch_array();
    return $result;
}

function checkedLogin($db, $login) {
    $query = $db->prepare('SELECT * FROM `us_testhh` WHERE `login` = ?');
    $query->bind_param('s', $login);
    $query->execute();
    $getResult = $query->get_result();
    $result = $getResult->fetch_array();
    return $result;
}
?>