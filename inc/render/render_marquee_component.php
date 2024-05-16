<?php
  /**
   * Render a marquee component
   */
  function render_marquee($marquee) {
    $output = "<div class='enable-animation'>";
    $output .= "<div class='marquee hover-pause'>";

    $output .= "<ul class='marquee-content'>";
    foreach ($marquee as $image) {
      $image_src = wp_get_attachment_image_src($image['id'], 'large');
      $image_src = $image_src[0];

      $output .= "<li><img src='{$image_src}' alt='{$image['alt_text']}' /></li>";
    }
    $output .= "</ul>";
    $output .= "<ul class='marquee-content' aria-hidden='true'>";
    foreach ($marquee as $image) {
      $image_src = wp_get_attachment_image_src($image['id'], 'large');
      $image_src = $image_src[0];

      $output .= "<li><img src='{$image_src}' alt='{$image['alt_text']}' /></li>";
    }
    $output .= "</ul>";

    $output .= "<ul class='marquee-content' aria-hidden='true'>";
    foreach ($marquee as $image) {
      $image_src = wp_get_attachment_image_src($image['id'], 'large');
      $image_src = $image_src[0];

      $output .= "<li><img src='{$image_src}' alt='{$image['alt_text']}' /></li>";
    }
    $output .= "</ul>";

    $output .= "</div>";
    $output .= "</div>";

    return $output;
  } 