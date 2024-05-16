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
$ctas = isset($args['ctas']) && is_array($args['ctas']) ? $args['ctas'] : [];

if (!empty($ctas)): ?>
  <div class="ctas">
    <?php foreach ($ctas as $cta) {
      echo render_cta_component($cta);
    } ?>
  </div>
<?php endif; ?>
