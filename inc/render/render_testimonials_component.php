<?php
  /**
   * Render a testimonial component
   */
  function render_testimonials_component($testimonial) {
    $logo = array(
      'id' => get_field('organization_logo', $testimonial->ID),
      'alt_text' => get_field('organization', $testimonial->ID),
    );

    ob_start();
    render_image_component($logo);
    $logo_output = ob_get_clean();

    $name = get_field('quotee', $testimonial->ID);
    $position = get_field('position', $testimonial->ID);
    $organization = get_field('organization', $testimonial->ID);
    $post_thumbnail = get_the_post_thumbnail($testimonial->ID);

    $output = <<<HTML
      <div class="testimonial-image">
        {$post_thumbnail}
      </div>
      <blockquote>
        {$testimonial->post_content}
        <footer>
          <div class="attribution">
            {$logo_output}
            <div class="quotee">
              <p class="name">{$name}</p>
              <p class="position">{$position}</p>
              <p class="organization">{$organization}</p>
            </div>
          </div>
        </footer>
      </blockquote>
    HTML;

    return $output;
  }