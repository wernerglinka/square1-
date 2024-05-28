<?php
/**
 * Page section for displaying a image comparion section with two images
 * 
 * @package square1
 */

  $props = $args['props'];
  $image1 = $props['images']['image1'];
  $image2 = $props['images']['image2'];

  //echo "<pre>";
  //print_r($props);
  //echo "</pre>";
 ?>

  <div class="image-comparison-container">
		<?php echo render_image_component($image1); ?>
		<span class="image-status before"><?php echo $image1['title'] ?></span>

		<div class="after-image">
			<?php echo render_image_component($image2); ?>
			<span class="image-status after"><?php echo $image2['title'] ?></span>
		</div>

		<span class="comparison-handle"><?php echo get_icon('arrow-right-left'); ?></span>
	</div> <!-- image-comparison-container -->

 