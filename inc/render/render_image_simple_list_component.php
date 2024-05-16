<?php
  /**
   * Render an images gallery component
   */
  function render_image_simple_list_component($images) {
    $output = <<<HTML
      <ul class='image-simple-list'>
    HTML;

    foreach ($images as $image) {
      $image_src = wp_get_attachment_image_src($image['image']['id'], 'large');
      $image_src = $image_src[0];
      $link_url = $image['cta']['link']['url'];
      $link_text = $image['cta']['link']['title'];
      $link_attributes = $image['cta']['link']['target'] ? 'target="_blank" rel="noopener noreferrer"' : '';

      $output .= <<<HTML
        <li>
      HTML;

      if ($link_url) {
        $output .= <<<HTML
          <a href='{$link_url}' {$link_attributes}>
        HTML;
      }

      $output .= <<<HTML
        <img src='{$image_src}' alt='{$image['image']['alt_text']}' />
      HTML;

      if ($link_url) {
        $output .= <<<HTML
          </a>
        HTML;
      }

      $output .= <<<HTML
        </li>
      HTML;
    }

    $output .= <<<HTML
      </ul>
    HTML;

    return $output;
  }

