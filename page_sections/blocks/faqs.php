<?php
/**
 * Renders an faqs component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */

  $faqs = $args['faqs'];
  $single_active = $args['single_active'];

  echo render_faqs_component($faqs, $single_active);
?>


