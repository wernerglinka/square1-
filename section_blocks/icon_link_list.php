<?php
  /**
   * Renders an icon link list
   * It is called via 'get_template_part('section_column_rows/' . $row_name, null, $row)'
   * where $args is passing in the $row array
   *
   * @package square1
   */
  include_once get_template_directory() . '/page_sections/inc/section_components.php';

  $allLinks = $args['links'];

  render_icon_link_list_component($allLinks);
?>

