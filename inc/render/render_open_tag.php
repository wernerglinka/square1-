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
  // NOTE that the js-is-animated class is hard coded for all sections! This should probably be a setting
  $tag = <<<OPENTAG
    <$wrapper_type$id_attr class='page-section js-is-animated $section_name $body_classes'$style_attr>
  OPENTAG;

  return $tag;
}
