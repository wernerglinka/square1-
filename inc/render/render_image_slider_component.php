<?php
  /**
   * Render an image slider component
   */
  function render_image_slider_component($args) {
    $images = $args['images'];
    // #show_pagination is true if array $args['structure'] contains 'show_pagination' value

    $show_pagination = in_array('show_pagination', $args['structure']) ? true : false;
    $show_navigation = in_array('show_prev-next', $args['structure']) ? true : false;
    $show_scrollbar = in_array('show_scrollbar', $args['structure']) ? true : false;

    $output = "<div class='swiper js-image-slider'>";
    $output .= "<div class='swiper-wrapper'>";
    foreach ($images as $image) {
      $image_src = wp_get_attachment_image_src($image['image']['id'], 'large');
      $image_src = $image_src[0];
      $output .= "<div class='swiper-slide'>";
      $output .= "<img src='{$image_src}' alt='{$image['image']['alt_text']}' />";
      $output .= "</div>";
    }
    $output .= "</div>";
    if ($show_pagination) {
      $output .= "<div class='swiper-pagination'></div>";
    }
    if ($show_navigation) {
      $output .= "<div class='swiper-button-prev'></div>";
      $output .= "<div class='swiper-button-next'></div>";
    }
    if ($show_scrollbar) {
      $output .= "<div class='swiper-scrollbar'></div>";
    }

    $output .= "</div>";
    return $output;
  }
  