<?php
/**
 * Renders an image slider
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
include_once get_template_directory() . '/page_sections/inc/section_components.php';

//echo '<pre>';
//print_r($args);
//echo '</pre>';

echo render_image_slider($args);

?>
