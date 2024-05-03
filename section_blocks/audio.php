<?php
/**
 * Renders an audio component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
include_once get_template_directory() . '/page_sections/inc/section_components.php';
?>

<div class="audio">
  <?php if ($args['thumbnail']): ?>
    <?php echo render_image_component($args['thumbnail']);?>
  <?php endif;?>

  <?php echo render_audio_component($args);?>
</div>

