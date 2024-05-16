<?php
/**
 * Renders a video component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
$video_source = $args['source'];
$is_inline = $args['inline'];

//echo '<pre>';
//print_r($args);
//echo '</pre>';

?>

<div class="video <?php echo $is_inline ? 'inline' : ''; ?>">
  <?php echo render_video_component($args); ?>
</div>