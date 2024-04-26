<?php
/**
 * Renders a CTAs component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
include_once get_template_directory() . '/page_sections/inc/section_components.php';

$ctas = isset($args['ctas']) && is_array($args['ctas']) ? $args['ctas'] : [];

// Exit if $ctas length is 1 and $ctas[0]['link'] is empty or not set
if (count($ctas) === 1 && (empty($ctas[0]['link']) || !isset($ctas[0]['link']))) {
    return;
}

if (!empty($ctas)): ?>
  <div class="ctas">
    <?php foreach ($ctas as $cta) {
      render_cta_component($cta);
    } ?>
  </div>
<?php endif; ?>
