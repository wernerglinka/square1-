<?php
  function trunctate_text($string, $length) { 
    $string = strip_tags($string);
    if (strlen($string) > $length) {

      // truncate string
      $stringCut = substr($string, 0, $length);
      $endPoint = strrpos($stringCut, ' ');

      //if the string doesn't contain any space then it will cut without word basis.
      $string = $endPoint? substr($stringCut, 0, $endPoint) : substr($stringCut, 0);
      $string .= '...';
    }
    return $string;
  }
  