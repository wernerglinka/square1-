<?php
  function titleCase($string) {
    //source: https://gist.github.com/JonnyNineToes/7161300
    //reference http://grammar.about.com/od/tz/g/Title-Case.htm
    //The below array contains the most commonly non-capitalized words 
    //in title casing - I'm not so sure about the commented ones that follow it...
    $minorWords = array('a','an','and','as','at','but','by','for','in', 'is','nor','of','on','or','per','the','to','with'); // but, is, if, then, else, when, from, off, out, over, into,
    // take the input string, trim whitespace from the ends, single out all repeating whitespace
    $string = preg_replace('/[ ]+/', ' ', trim($string));
    // explode string into array of words
    $pieces = explode(' ', $string);
    // for each element in array...

    for($p = 0; $p <= (count($pieces) - 1); $p++){
      // check if the whole word is capitalized (as in acronyms), if it is not...
      if(strtoupper($pieces[$p]) != $pieces[$p]){
        // reduce all characters to lower case
        $pieces[$p] = strtolower($pieces[$p]);
        // if the value of the element doesn't match any of the elements in the minor words array, and the index is not equal to zero, or the numeric key of the last element...
        if(!in_array($pieces[$p], $minorWords) || ($p === 0 || $p === (count($pieces) - 1))){
          // ...capitalize it.
          $pieces[$p] = ucfirst($pieces[$p]);
        }
      }
    }
    // re-connect all words in array with a space
    $string = implode(' ', $pieces);
    // return title-cased string
    return $string;
  }