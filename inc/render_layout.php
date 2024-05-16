<?php
  include_once get_template_directory() . '/inc/render.php';
  include_once(get_template_directory() . '/inc/utilities.php');

  /**
   * Render Layout
   */

  // Get the current tag name. E.g. section, article, div, aside
  $section = get_row_layout();

  // Get the properties for the current section
  $props = get_sub_field($section);

  // if is_disabled in common_section_fields is set to true, the section will not be rendered
  $common_fields = isset($props['common_section_fields']) ? $props['common_section_fields'] : false;
  $is_disabled = $common_fields ? in_array("is_disabled", $props['common_section_fields']['settings']) : false;

  if (!$is_disabled) {

    echo render_open_tag($section);

    // render the layout
    get_template_part( 'page_sections/' . $section, null, array('props' => $props));

    echo render_close_tag($section);
  }