<?php
/**
 * Inner part of a any-block section
 *
 * @package square1
 */

$props = $args['props'];
$columns = $props['columns'];

$section_name = $props['name'] ?? "";
$section_name = strtolower($section_name);
$section_name = str_replace(' ', '-', $section_name);


//echo "<pre>";
//print_r($props['columns']);
//echo "</pre>";

?>

<div class="columns container <?php echo $section_name; ?>">
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