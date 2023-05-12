<?php

function addNewUser($db, $fio, $status, $email, $phone, $city, 
                            $street, $house, $flat, $login, $password){
                            
                              
    $hash_passw = md5($password);
   
    $query = $db->prepare('INSERT INTO `us_testhh` 
                             (`id`, `fio`, `status`, `email`, `phone`, `city`,
                            `street`, `house`, `flat`, `login`, `password`, 
                            `hash_password`) VALUES 
                             (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
 
    $query->bind_param('sssssssssss',
                        $fio,
                        $status,
                        $email,
                        $phone,
                        $city,
                        $street,
                        $house,
                        $flat,
                        $login,
                        $password,
                        $hash_passw);
    $query->execute();

    $last_insert_id = $query->insert_id;
    sendUserMsg($fio, $email, $password);
    return $last_insert_id;
    
}


function sendUserMsg($fio, $email, $password) {
    $site = $_SERVER['SERVER_NAME'];
    $email_site = 'testhh@testhh.ru';

    $to = $email; 
    $subject = "Данные регистрации на сайте";  
    $message = 'Здравствуйте '.$fio.'! Вы зарегистрировались на сайте '.$site.'/n
                ваши регистрационные данные для входа в личный кабинет/n
                Эл. почта: '.$email.', Пароль: '.$password.'';  
    $headers = 'From: '.$email_site.';\r\n';   

    mail($to, $subject, $message, $headers);
}


?>
