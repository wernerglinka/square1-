<?php
/**
 * Renders a marquee
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */

  

  //echo '<pre>';
  //print_r($args);
  //echo '</pre>';

  echo render_marquee($args);
