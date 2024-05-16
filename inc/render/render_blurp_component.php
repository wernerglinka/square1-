<?php

  /**
   * Render a blurb component.
   */
  function render_blurb_component($blurb) {
      if (empty($blurb)) {
          return;
      }
      $text = isset($blurb['text']['title']) || isset($blurb['text']['sub_title']) || isset($blurb['text']['prose']) ? render_text_component($blurb['text']) : null;
      $ctas = '';
      if (count($blurb['ctas']) > 0) {
          $ctas .= '<div class="ctas-container">';
          foreach ($blurb['ctas'] as $cta) {
              $ctas .= render_cta_component($cta);
          }
          $ctas .= '</div>';
      } else {
          $ctas = null;
      }
      $icon = isset($blurb['icon']) && $blurb['icon'] !== 'none' ? "<span class='icon'>" . get_icon($blurb['icon']) . "</span>" : null;

      $image_src = null;
      if (isset($blurb['image']['id'])) {
          $image_src_array = wp_get_attachment_image_src($blurb['image']['id'], 'thumbnail');
          if ($image_src_array !== false) {
              $image_src = $image_src_array[0];
          }
      }
      $image = $image_src !== null ? "<div class='image'><img src='" . $image_src . "' alt='' /></div>" : null;

      $output = <<<BLURBS
        <div class='blurb'>
          <div class='decoration'>
            {$icon}
            {$image}
          </div>
          <div class='blurb-body'>
            {$text}
            {$ctas}
          </div>
        </div>
      BLURBS;

      return $output;
  }
