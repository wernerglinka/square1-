<?php
  /**
   * Render an images gallery filter
   */
  function render_image_gallery_filter($filter_terms) {
    $output = "<ul class='filter js-filter'>";
    $output .= "<li><button class='button inverted active' filter-item='all'>All</button></li>";
    foreach ($filter_terms as $term) {
      $output .= "<li><button class='button inverted' filter-item='{$term["value"]}'>{$term["label"]}</button></li>";
    }
    $output .= "</ul>";
    return $output;
  }

  /**
   * Render an images gallery component
   */
  function render_image_gallery($images_gallery) {
    $output = "<div class='images-gallery js-images-gallery'>";
    foreach ($images_gallery as $image) {
      $image_src = wp_get_attachment_image_src($image['image']['id'], 'large');
      $image_src = $image_src[0];
      // image may have multiple filter terms
      $filter = '';
      foreach ($image['filter_term'] as $term) {
        $filter .= $term['value'] . ', ';
      }
      $filter = rtrim($filter, ', ');
      $output .= "<div class='image js-image filter-item' filter-item='{$filter}'><img src='{$image_src}' alt='{$image['image']['alt_text']}' /></div>";
    }
    $output .= "</div>";
    return $output;
  }