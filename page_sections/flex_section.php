<?php
/**
 * Inner part of a flex section
 * A flex section may be used to compose various sections with different layouts.
 * A flex section can have multiple columns, each column can have multiple components.
 * 
 *
 * @package square1
 */

$props = $args['props'];
$columns = isset($props['columns']) && is_array($props['columns']) ? $props['columns'] : [];
$number_of_columns = count($columns);

?>

<div class="columns container count<?php echo $number_of_columns; ?>">
  <?php foreach ($columns as $column) : ?>
    <div class="column">
      <?php 
      $components = $column['components'];
      if (empty($components)) {
        echo "No components found.";
      } else {
        foreach ($components as $component) :
          $component_name = $component['acf_fc_layout'];
          get_template_part('page_sections/blocks/' . $component_name, null, $component);
        endforeach; 
      }
      ?>
    </div>
  <?php endforeach; ?>
</div>