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
		<span class="image-title" data-type="before"><?php echo $image1['title'] ?></span>

		<div class="resize-img">
			<?php echo render_image_component($image2); ?>
			<span class="image-title" data-type="after"><?php echo $image2['title'] ?></span>
		</div>

		<span class="comparison-handle"></span>
	</div> <!-- image-comparison-container -->

 