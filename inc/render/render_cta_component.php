<?php
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

    return $output;
  }
