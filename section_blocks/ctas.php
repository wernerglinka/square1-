<?php
/**
 * Renders a row with CTAs
 * This row is used in the any-block section.
 * It is called via 'get_template_part('section_column_rows/' . $row_name, null, $row)'
 * where $args is passing in the $row array
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
