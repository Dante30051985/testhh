<?php

function createTable($link) {

    $queryUsers = "CREATE TABLE IF NOT EXISTS `us_testhh` (
        `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `fio` VARCHAR(150) NOT NULL,
        `status` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `phone` VARCHAR(100) NOT NULL,
        `city` VARCHAR(100) NOT NULL,
        `street` VARCHAR(100) NOT NULL,
        `house` VARCHAR(100) NOT NULL,
        `flat` VARCHAR(100) NOT NULL,
        `login` VARCHAR(100) NOT NULL,
        `password` VARCHAR(100) NOT NULL,
        `hash_password` VARCHAR(100) NOT NULL   
       ) ENGINE=InnoDB";
    $link->query($queryUsers);

}

?>