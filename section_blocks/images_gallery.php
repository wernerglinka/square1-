<?php
/**
 * Renders an images gallery component
 * It is called in flex_section via:
 * $component_name = $component['acf_fc_layout'];
 * get_template_part('section_blocks/' . $component_name, null, $component);
 * where $args is passing in the $component array
 *
 * @package square1
 */
include_once get_template_directory() . '/page_sections/inc/section_components.php';

//echo '<pre>';
//print_r($args);
//echo '</pre>';

$images_gallery = $args['images_gallery'];
$use_filterize = $args['use_filterize'] ?? false;
// create array from filter terms
$filter_terms = [];
// loop over images_gallery and get the filter terms. Each image may have multiple filter terms
// if the filter term is not in the filter_terms array, add it
foreach ($images_gallery as $image) {
  $terms = $image['filter_term'];

  foreach ($terms as $term) {
    if (!in_array($term, $filter_terms)) {
      $filter_terms[] = $term;
    }
  }
}
// order the filter terms by value
sort($filter_terms);

if ($use_filterize) {
  echo "<div class='images-gallery-container has-filterizr js-filterizr-gallery-container'>";
    // render the images gallery filter
    echo render_filterizr_gallery_filter($filter_terms);
    // render the images galley
    echo render_filterizr_gallery($images_gallery);
  echo "</div>";

} else {
  echo "<div class='images-gallery-container js-images-gallery-container'>";
    // render the images gallery filter
    echo render_images_gallery_filter($filter_terms);
    // render the images galley
    echo render_images_gallery($images_gallery);
  echo "</div>";
}


?>
