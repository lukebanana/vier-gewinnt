<?php

if(isset($_POST['test'])){

    return json_encode($_POST);

}

$_POST['test'] = "blaa";
var_dump(json_encode($_POST));