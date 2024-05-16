<?php

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

      return $tag;
  }
