<?php
/**
 * Renders a text component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
?>
<div class="text">
  <?php echo render_text_component($args); ?>
</div>



