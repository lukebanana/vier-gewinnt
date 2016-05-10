<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DB_MAIN', 'localhost|root|root|vier-gewinnt');


function get_game_state($gameID){
  require_once("Database.php");

  $db = new Database(DB_MAIN);
  $rows = $db->fetchAll('SELECT gameState FROM games WHERE id=?', $gameID);

  if($rows){

    $rows[0]->error = 0;
    var_dump(json_encode($rows[0]));
    return json_encode($rows[0]);
  }else{
    return '{"error" : 1, "errorMsg": "No entries found with this Game ID"}';
  }
}


function is_valid_move($moveX, $moveY, $playerID, $gameID){
  return true;
}

function set_move($moveX, $moveY, $playerID, $gameID){
  return true;
}


if(isset($_GET['getState']) && isset($_GET['gameID'])){
  return get_game_state($_GET['gameID']);
}


if(
  isset($_GET['x']) &&
  isset($_GET['y']) &&
  isset($_GET['playerID']) &&
  isset($_GET['gameID'])){

  $moveX = $_GET['x'];
  $moveY = $_GET['y'];
  $playerID = $_GET['playerID'];
  $gameID = $_GET['gameID'];

  if(is_valid_move($moveX, $moveY, $playerID, $gameID)){
    if(!set_move($moveX, $moveY, $playerID, $gameID)){
        return '{"error" : 1, "errorMsg": "Unable to set move!"}';
    }
  }else{
    return '{"error" : 1, "errorMsg": "Not a valid move!"}';
  }
}


