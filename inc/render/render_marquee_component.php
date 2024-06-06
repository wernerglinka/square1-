<?php
  /**
   * Render a marquee component
   */
  function render_marquee($marquee) {
    $output = "<div class='marquee js-marquee hover-pause'>";
    $output .= "<div class='logos-wrapper js-logos-wrapper'>";

    $copies = 2;

    for ($i = 0; $i < $copies; $i++) {
      $output .= "<ul class='logos js-logos'>";
      foreach ($marquee as $image) {
        $image_src = wp_get_attachment_image_src($image['id'], 'large');
        $image_src = $image_src[0];

        $output .= "<li><img src='{$image_src}' alt='{$image['alt_text']}' /></li>";
      }
      $output .= "</ul>";
    }
    $output .= "</div>";
    $output .= "</div>";

    return $output;
  } 