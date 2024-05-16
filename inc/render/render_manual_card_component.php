<?php
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

    return $output;
  }