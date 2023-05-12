<?php
include_once './db/settings.php';
include_once './db/db.php';
include_once './reg/add_new_reg.php';
include_once './reg/checked_user.php';

if (isset($_POST)){

    $body = file_get_contents('php://input');
    $boundary = substr($body, 0, strpos($body, "\r\n"));
    $parts = explode($boundary, $body);

    $pattern = '/Content-Disposition: form-data; name=".*"/m';

        for ($i = 0; $i < count($parts); $i++) {
            $arr[$i] =  preg_replace($pattern, '', $parts[$i]);
        }

    $fio = htmlspecialchars(trim(urldecode($arr[1])));
    $status = htmlspecialchars(trim(urldecode($arr[2])));
    $email = htmlspecialchars(trim(urldecode($arr[3])));
    $phone = htmlspecialchars(trim(urldecode($arr[4])));
    $city = htmlspecialchars(trim(urldecode($arr[5])));
    $street = htmlspecialchars(trim(urldecode($arr[6])));
    $house = htmlspecialchars(trim(urldecode($arr[7])));
    $flat = htmlspecialchars(trim(urldecode($arr[8])));
    $login = htmlspecialchars(trim(urldecode($arr[9])));
    $password = htmlspecialchars(trim(urldecode($arr[10])));
 
    $checkedUser = checked_user($db, $email, $login);
    
    if ($checkedUser) {
    $res = addNewUser($db, $fio, $status, $email, $phone, $city, 
                     $street, $house, $flat, $login, $password);
        echo json_encode($res);
    } 
}

?>