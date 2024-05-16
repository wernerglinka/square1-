<?php

  /**
   * Render an image component with alt text and credits
   */
  function render_image_component($image) {
    $image_id = $image['id'];

    if (!$image_id) {
      return;
    }

    return wp_get_attachment_image($image_id, 'large', false, ['alt' => $image['alt_text']]);
  }
