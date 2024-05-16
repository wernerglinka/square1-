<?php
  /**
   * Render a title and append a period if it's missing
   */
  function render_title($title, $header_level) {
    $title = preg_replace('/^<[^>]+>|<\/[^>]+>$/', '', $title);

    $output = <<<EOT
      <$header_level class='text-title'>
        $title
      </$header_level>
    EOT;

    return $output;
  }