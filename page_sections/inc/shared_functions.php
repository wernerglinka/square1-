<?php
  /**
   * Render a title and append a period if it's missing
   */
  function render_title($title, $header_level) {
    $title = preg_replace('/^<[^>]+>|<\/[^>]+>$/', '', $title);

    $output = <<<EOT
      <$header_level class='text-title'>
        $title
      </$header_level>
    EOT;

    return $output;
  }
?>

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
?>

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
  } // end trunctate_text
?>

<?php 
  function build_section_class_string($params) {
    $classes = [];
    $fields = $params['common_section_fields'] ?? [];

    if (!empty($fields['section_type'])) {
      $classes[] = $fields['section_type'];
    }

    if (!empty($fields['section_direction'])) {
      $classes[] = 'is-reversed';
    }

    $settings = $fields['settings'] ?? [];
    $settingsClasses = [
      'in_container' => 'in-container',
      'no_top_margin' => 'no-top-margin',
      'no_bottom_margin' => 'no-bottom-margin',
      'narrow_width' => 'narrow-width',
    ];

    foreach ($settingsClasses as $setting => $class) {
      if (in_array($setting, $settings)) {
        $classes[] = $class;
      }
    }

    if (!empty($fields['background_is_dark'])) {
      $classes[] = 'is-dark';
    }

    if (!empty($params['is_horizontal'])) {
      $classes[] = 'is-horizontal';
    }

    if (!empty($fields['section_classes'])) {
      $classes[] = $fields['section_classes'];
    }

    if (!empty($fields['background_color']) && $fields['background_color'] !== 'none') {
      $classes[] = 'has-background-color';
    }

    if (!empty($fields['background_image']['id'])) {
      $classes[] = 'has-background-image';
    }

    if (!empty($fields['background_pattern']['css_pattern']) && $fields['background_pattern']['css_pattern'] !== 'none') {
      $classes[] = $fields['background_pattern']['css_pattern'];
    }

    if (!empty($fields['screen']['has_screen'])) {
      $classes[] = $fields['screen']['dark_screen'] ? 'has-dark-screen' : 'has-light-screen';
    }

    return implode(' ', $classes);
  }
?>

<?php
  function build_section_styles_string($params) {
    $styles = "";
    $fields = $params['common_section_fields'] ?? [];

    if (!empty($fields['background_color']) && $fields['background_color'] !== "none") {
      $styles .= "background-color: {$fields['background_color']};";
    }

    if (!empty($fields['background_image']['id'])) {
      $image_id = $fields['background_image']['id'];
      $styles .= "--bg-image: url(" . wp_get_attachment_image_url($image_id, 'full size') . ");";
    }

    return $styles;
  }
?>