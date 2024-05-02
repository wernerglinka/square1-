<?php
/**
 * Renders a Blurbs component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
include_once get_template_directory() . '/page_sections/inc/section_components.php';

$blurbs = isset($args['blurb']) && is_array($args['blurb']) ? $args['blurb'] : [];

//echo "<pre>";
//print_r($blurbs);
//echo "</pre>";



if (!empty($blurbs)): ?>
  <div class="blurbs">
    <?php foreach ($blurbs as $blurb) {
      render_blurb_component($blurb);
    } ?>
  </div>
<?php endif; ?>
