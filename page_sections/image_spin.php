<?php
/**
 * Page section for displaying a section with a spinning image
 * 
 * @package square1
 */

  $props = $args['props'];
  
  // get image url with ID
  $image = $props['image'];
  $image_thumbnail_source = wp_get_attachment_image_src($image['image_thumbnail']['id'], 'full');
  $image_sprite = wp_get_attachment_image_src($image['image_sprite']['id'], 'full');
?>

<div class="container">
  <div
    class="imageSpinContainer js-image-spin"
    style='background-image: url(<?php echo $image_thumbnail_source[0]; ?>);'
    data-image-sprite="<?php echo $image_sprite[0]; ?>"
    data-spin-continuously="<?php echo $image['is_spinning'] ? 'true' : 'false'; ?>"
    data-spin-direction="<?php echo $image['spin_direction']; ?>"
  ></div>
</div>