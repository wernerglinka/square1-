<?php
  /**
   * Render the opening tag for a section
   * This may be a section, an article, a div or an aside
   * The ID, all classes, and inline styles will be added here.
   * In addition the opening tag for a container div is added
   */
  function render_open_tag($section) {
    // Get section name
    $section_name = str_replace('_', '-', $section);

    // Get the properties for the current section
    $props = get_sub_field($section);

    // common section fields are set, that was checked before function call
    $common_fields = $props['common_section_fields'];

    // Get the wrapper type, default to 'section' if not set
    $wrapper_type = $common_fields ? $props['common_section_fields']['wrapper_element'] : 'section';

    // Build the class string for the body
    $body_classes = build_section_class_string($props);

    // Build the styles string for the body
    $body_styles = build_section_styles_string($props);

    // Get the section ID, if any
    $section_id = $common_fields ? $props['common_section_fields']['section_id'] : '';

    // Prepare the id attribute
    $id_attr = !empty($section_id) ? " id='{$section_id}'" : '';

    // Prepare the style attribute
    $style_attr = $body_styles ? " style='{$body_styles}'" : '';

    // Output the opening tag
    $tag = <<<OPENTAG
      <$wrapper_type$id_attr class='page-section $section_name $body_classes'$style_attr>
    OPENTAG;

    echo $tag;

  }

  /**
   * Render the closing tag for a section
   * In addition the closing tag for the container div is added
   */
  function render_close_tag($section) {
    // Get the properties for the current section
    $props = get_sub_field($section);

    // Get the wrapper type, default to 'section' if not set
    $wrapper_type = $props['common_section_fields'] ? $props['common_section_fields']['wrapper_element'] : 'section';

    // Output the closing tag
    $tag = <<<CLOSINGTAG
    </$wrapper_type>
    CLOSINGTAG;

    echo $tag;

  }

  /**
   * Render a text component
   * wp editor adds <p> tags. we use a regex to strip the opening 
   * and the closing tag. Everything in between remains
   * The code must start with an opening tag and end with a closing tag. 
   * No white space or other text must be present before the first 
   * ^<[^>]+>     This removes the first tag
   * <\/[^>]+>$   This removes the last closing tag
   */
  function render_text_component($text) {
    $output = '';

    $title = $text['title'] ?? null;
    if ($title) {
        $title = preg_replace('/^<[^>]+>|<\/[^>]+>$/', '', $title);
        render_title($title, $text['heading_level']);
    }

    $sub_title = $text['sub_title'] ?? null;
    if ($sub_title) {
        $output .= "<p class='text-subtitle'>{$sub_title}</p>";
    }

    $prose = $text['prose'] ?? null;
    if ($prose) {
        $output .= "<div class='text-prose'>{$prose}</div>";
    }

    echo $output;
  }

  /**
   * Render a CTA component. 
   * The link may rendered as a button or text link.
   * External links will be rendered with target="_blank" and rel="noopener noreferrer" 
   */
  function render_cta_component($cta) {
    if (!$cta['link']) {
      return;
    }

    $url = $cta['link']['url'];
    $label = $cta['link']['title'];
    $button_class = !empty($cta['is_button']) ? "button " . $cta['button_type'] . " " : "text-link ";
    $button_class .= $cta['cta_classes'] ?? '';
    $external_attributes = isset($cta['link']['target']) ? "target='_blank' rel='noopener noreferrer'" : null;
    $hint = $cta['link']['target'] === "_blank" ? "<span class='screen-reader-text'>Opens a new tab</span>" : null;

    $output = <<<CTA
      <a class='cta {$button_class}' href='{$url}' {$external_attributes}>{$label}{$hint}</a>
    CTA;

    echo $output;

  }

  /**
   * Render an icon link list component
   */
  function render_icon_link_list_component($links) {
    if (empty($links)) {
      return;
    }

    $output = "<ul class='icon-links'>";
    foreach ($links as $link) {
      $icon = get_icon($link['icon']);
      $url = esc_url($link['target']['url']);
      $target = esc_attr($link['target']['target']);
      $label = esc_html($link['label']);

      $output .= <<<ICONLINK
        <li>
          <a href="{$url}" target="{$target}">
            {$icon}
            <span>{$label}</span>
          </a>
        </li>
      ICONLINK;
    }
    $output .= "</ul>";
    echo $output;
  }

  
  /**
   * Render an audio component with optional thumbnail
   */
  function render_audio_component($audio) {
      if (!isset($audio['source'])) {
        return;
      }

      // get the audio file extension so we can form the proper mime type
      // the url may include a query parameter, so we use parse_url to get the path
      $audio_path = parse_url($audio['source'])['path'];
      $audio_file_extension = trim(pathinfo($audio_path)['extension']);

      $source = esc_url($audio['source']);
      $type = esc_attr($audio_file_extension);

      $output = <<<AUDIO
        <audio controls>
          <source src="{$source}" type="audio/{$type}"/>
          Your browser does not support the audio element.
        </audio>
      AUDIO;

      echo $output;
  }

  function get_icon($icon) {
    $icon_path = get_template_directory() . '/icons/' . $icon . ".svg";
    return file_get_contents($icon_path);
  }

  /**
   * Render an icon component
   */
  function render_icon_component($icon) {
    if (!isset($icon['icon'])) {
      return;
    }
    echo get_icon($icon['icon']);
  }

  /**
   * Render an image component with alt text and credits
   */
  function render_image_component($image) {
    $image_id = $image['id'];

    if (!$image_id) {
      return;
    }

    echo wp_get_attachment_image($image_id, 'large', false, ['alt' => $image['alt_text']]);
  }

  /**
   * Render a lottie animation component
   */
  function render_lottie_component($lottie) {
    if (!isset($lottie['source'])) {
      return;
    }

    $source = $lottie['source'];

    $output = <<<LOTTIEPLAYER
      <lottie-player class='js-lottie' src='{$source}' background='transparent' speed='1' autoplay=true loop=true></lottie-player>
    LOTTIEPLAYER;

    echo $output;
  }


  /**
   * Render an video component with optional thumbnail
   */
  function render_video_component($video) {
    extract($video);

    $video_thumbnail = wp_get_attachment_image($thumbnail['id'], 'large', false, ['alt' => $thumbnail['alt_text']]);

    if ($inline) {
      $output = <<<EOT
        <div class="inline">
          <div class="inline-video-wrapper js-inline-video-wrapper">
            <div class="js-inline-video" data-videoid="{$id}" data-videosrc="{$source}"></div>
          </div>

          <button class="video-trigger">
            <div class="play-button"></div>
            $video_thumbnail
          </button>
        </div>
      EOT;
            
    } else {        
      $output = <<<EOT
        <button class="js-modal-video" data-videoid="{$id}" data-videosrc="{$source}">
          <div class="play-button"></div>
          $video_thumbnail
        </button>
      EOT;
    }
    echo $output;
  }


  /** 
   * Render a resourse card component
   */
  function render_resources_list_component($resources) {
    if (!empty($resources)) {
      $output = "<ul class='resources-cards'>";
      foreach ($resources as $resource) {
        $resourceID = $resource->ID;
        $title = get_the_title($resourceID);
        $thumbnailURL = get_field('image', $resourceID);
        $link = get_field('link', $resourceID)['link'];
        $url = $link['url'];
        $target = $link['target'];
        $label = $link['title'];
        $external_attributes = isset($target) ? "target='_blank' rel='noopener noreferrer'" : null;
        $term_list = get_the_terms($resourceID, 'resource-taxonomy');
        $category = $term_list[0]->slug;

        $output .= "<li class='card'>
            <div class='header'>
                <div class='category'>{$category}</div>
                <p class='title'>{$title}</p>
            </div>
            <div class='image'>
                <img src='{$thumbnailURL}' alt='{$title}'/>
            </div>
            <div class='footer'>
                <a class='cta' href='{$url}' {$external_attributes}>{$label}</a>
            </div>
        </li>";
      }
      $output .= "</ul>";
      echo $output;
    }
  }

  /**
 * Render a logo card component
 */
function render_logos_list_component($resources) {
    if (!empty($resources)) {
        $output = "<ul class='logos-cards'>";
        foreach ($resources as $resource) {
            $resourceID = $resource->ID;
            $title = get_the_title($resourceID);
            $logoURL = get_the_post_thumbnail_url($resourceID);
            $synopsis = get_field('synopsis', $resourceID);
            $link = get_field('link', $resourceID)['link'];
            $url = $link['url'];
            $target = $link['target'];
            $label = $link['title'];
            $external_attributes = isset($target) ? "target='_blank' rel='noopener noreferrer'" : null;
            $term_list = get_the_terms($resourceID, 'resource-taxonomy');
            $category = $term_list[0]->slug;

            $output .= "<li class='card'>
            <div class='image'>
                <img src='{$logoURL}' alt='{$title}'/>
            </div>
            
            <div class='category'>{$category}</div>
            <p class='title'>{$title}</p>
            <p class='synopsis'>{$synopsis}</p>
            
            <div class='footer'>
                <a class='cta' href='{$url}' {$external_attributes}>{$label}</a>
            </div>
        </li>";
        }
        $output .= "</ul>";
        echo $output;
    }
}

/** 
 * Render a flip card component
 */
function render_flip_card_component($card) {
  $title = $card['front']['title'] ?? null;
  $sub_title = $card['front']['sub_title'] ?? null;
  $prose = $card['front']['prose'] ?? null;
  $backside_title = $card['back']['title'] ?? null;
  $backside_sub_title = $card['back']['sub_title'] ?? null;
  $backside_prose = $card['back']['prose'] ?? null;

  $output = "<li>
    <div class='flip-card-wrapper'>
      <div class='flip-card'>
        <span class='icon'>" . get_icon($card['icon']) . "</span>
        <span class='flip-icon'>" . get_icon('rotate') . "</span>";
  if ($title) {
    $output .= "<h3>" . $title . "</h3>";
  }
  if ($sub_title) {
    $output .= "<p class='sub-title'>" . $sub_title . "</p>";
  }
  if ($prose) {
    $output .= "<div class='prose'>" . $prose . "</div>";
  }
  $output .= "  </div>
      <div class='flip-card-back'>";
  if ($backside_title) {
    $output .= "<h3>" . $backside_title . "</h3>";
  }
  if ($backside_sub_title) {
    $output .= "<p class='sub-title'>" . $backside_sub_title . "</p>";
  }
  if ($backside_prose) {
    $output .= "<div class='prose'>" . $backside_prose . "</div>";
  }
  $output .= "  </div>
    </div>
  </li>";

  echo $output;
}

/**
 * Render a manual card component
 */
function render_manual_card_component($card) {
  $decoration = $card['decoration'] ?? null;
  $title = $card['text']['title'] ? preg_replace('/^<[^>]+>|<\/[^>]+>$/', '', $card['text']['title']) : null;
  $sub_title = $card['text']['sub_title'] ?? null;
  $prose = $card['text']['prose'] ?? null;
  $ctas = $card['ctas'] ?? [];
  $is_horizontal = $card['is_horizontal'] ?? false;
  $css_pattern_background = $card['background']['background_pattern']['css_pattern'] !== 'none' ? $card['background']['background_pattern']['css_pattern'] : null;

  $output = "<li class='card {$css_pattern_background}'>";

  if ($decoration !== "none") {
    $output .= "<div class='header'>"; // Use .= instead of =

    if ($decoration === 'icon' && isset($card['icon']['icon'])) {
      $icon = get_icon($card['icon']['icon']);
      $output .= "{$icon}";
    }
    if ($decoration === 'image' && isset($card['image']['id'])) {
      $image = wp_get_attachment_image($card['image']['id'], 'large', false, ['alt' => $card['image']['alt_text']]);
      $output .= "{$image}";
    }

    $output .= "</div>"; // Use .= instead of =
  } 

  $output .= "<div class='card-text'>
                <div class='body'>";

  if ($title) {
    $output .= "<h3 class='title'>{$title}</h3>";
  }
  if ($sub_title) {
    $output .= "<p class='subtitle'>{$sub_title}</p>";
  }
  if ($prose) {
    $output .= "<div class='prose'>{$prose}</div>";
  }
  $output .= "</div>";

  if (!empty($ctas)) {
    $output .= "<div class='footer'>";
    foreach ($ctas as $cta) {
      $link = $cta['link'] ?? null;
      if ($link && isset($link['url']) && isset($link['title'])) {
        $external_attributes = isset($link['target']) ? "target='_blank' rel='noopener noreferrer'" : null;
        $hint = isset($link['target']) && $link['target'] === "_blank" ? "<span class='screen-reader-text'>Opens a new tab</span>" : null;
        $output .= "<a class='cta' href='{$link['url']}' {$external_attributes}>{$link['title']}{$hint}</a>";
      }
    }
    $output .= "</div>";
  }

  $output .= "</div></li>";

  echo $output;
}

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

  echo $output;
}
?>
 