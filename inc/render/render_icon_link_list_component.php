<?php
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
    return $output;
  }