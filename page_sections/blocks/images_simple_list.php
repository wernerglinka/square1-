<?php
/**
 * Renders an images gallery component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */

$images = $args['images_simple_list'];

//echo "<pre>";
//print_r($images);
//echo "</pre>";

echo render_image_simple_list_component($images);

?>
