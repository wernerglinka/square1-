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