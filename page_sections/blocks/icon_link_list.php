<?php
  /**
   * Renders an icon link list
   * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
   *
   * @package square1
   */
  $allLinks = $args['links'];

  echo render_icon_link_list_component($allLinks);
?>

