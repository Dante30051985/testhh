<?php

if (isset($_POST['userCaptcha'])) {

    $cook1 = $_COOKIE['captcha1'];
    $cook2 = $_COOKIE['captcha2'];
    $enterCaptcha = htmlspecialchars($_POST['userCaptcha']);

    $str = $cook1 . ' ' . $cook2;

    if ($str != $enterCaptcha) {
        echo json_encode(false);
    } else {
        echo json_encode(true);
    }
} 
?>