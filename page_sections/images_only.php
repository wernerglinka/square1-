<?php
/**
 * Page section for displaying a section with one or more images
 * 
 * @package square1
 */

  $props = $args['props'];
  $images = $props['images'];

  //echo "<pre>";
  //print_r($ctas);
  //echo "</pre>";
?>

  <div class="images">
    <?php foreach ($images as $image): ?>
      <?php echo render_image_component($image); ?>
    <?php endforeach;?>
  </div>