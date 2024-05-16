<?php

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
          $output .= render_title($title, $text['heading_level']);
      }

      $sub_title = $text['sub_title'] ?? null;
      if ($sub_title) {
          $output .= "<p class='text-subtitle'>{$sub_title}</p>";
      }

      $prose = $text['prose'] ?? null;
      if ($prose) {
          $output .= "<div class='text-prose'>{$prose}</div>";
      }

      return $output;
  }