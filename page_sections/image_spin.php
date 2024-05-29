<?php
/**
 * Page section for displaying a section with a spinning image
 * 
 * @package square1
 */

  $props = $args['props'];
  
  // get image url with ID
  $image_thumbnail_source = wp_get_attachment_image_src($props['image']['image_thumbnail']['id'], 'full');
  $image_sprite = wp_get_attachment_image_src($props['image']['image_sprite']['id'], 'full');
?>

<div class="container">
  <div
    class="imageSpinContainer imgOne js-image-spin"
    style='background-image: url(<?php echo $image_thumbnail_source[0]; ?>);'
    data-image-sprite="<?php echo $image_sprite[0]; ?>"
    data-spin-continuously="true"
  ></div>
</div>