<?php
/**
 * Inner part of a any-block section
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
        foreach ($components as $component) :
          $component_name = $component['acf_fc_layout'];
          get_template_part('section_blocks/' . $component_name, null, $component);
        endforeach; 
      ?>
    </div>
  <?php endforeach; ?>
</div>