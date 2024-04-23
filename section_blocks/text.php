<?php
/**
 * Renders a text row
 * This row is used in the any-block section.
 * It is called via 'get_template_part('section_column_rows/' . $row_name, null, $row)'
 * where $args is passing in the $row array
 *
 * @package square1
 */
include_once get_template_directory() . '/page_sections/inc/section_components.php';
?>
<div class="text">
  <?php render_text_component($args); ?>
</div>




