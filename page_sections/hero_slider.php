<?php
/**
 * Page section for displaying a section with one or more images
 * 
 * @package square1
 */

  $props = $args['props'];
  $slides = $props['slides'];
  
  //echo "<pre>";
  //print_r($slides);
  //echo "</pre>";
?>


  <ul class="cd-hero__slider">
    <?php 
      foreach($slides as $index => $slide) :
        // check if there are any CTAs
        $has_ctas = isset($slide['ctas']) && is_array($slide['ctas']) && count($slide['ctas']) > 0;
        // check if there is at least one text field. All text fields are optional or a CTA
        $has_text = count(array_filter($slide['text'])) !== 0 || $has_ctas;
        // check if there is an image
        $has_image = !empty($slide['image']['id']) &&  isset($slide['image']['id']);
        $has_text_and_image = $has_text && $has_image;
        $content_width = $has_text_and_image ? 'cd-hero__content--half-width' : 'cd-hero__content--full-width';
        // check if there is a background image
        $has_background_image = !empty($slide['slide_background']['background_image']['id']);
        // check if there is a background video
        $has_background_video = !empty($slide['slide_background']['background_video']['id']);
        // check if there is a background color
        $has_background_color = !empty($slide['slide_background']['background_color']);
        
        // check if there is a background image or video
        $has_background = $has_background_image || $has_background_video || $has_background_color;
    ?>
      <li class="cd-hero__slide <?php if($index === 0) echo 'cd-hero__slide--selected'; ?> js-cd-slide">
        <div class="cd-hero__content <?php echo $content_width; ?>">
          <?php 
            echo render_text_component($slide['text']);

            $ctas = isset($slide['ctas']) && is_array($slide['ctas']) ? $slide['ctas'] : [];
            $hasCTAs = count($ctas) > 0;
            if ($hasCTAs): 
          ?>
            <div class="ctas-container">
            <?php 
              foreach ($ctas as $cta): 
                echo render_cta_component($cta);
              endforeach;
            ?>
            </div>
          <?php endif;?>
        </div> <!-- .cd-hero__content -->

        <?php if($content_width === 'cd-hero__content--half-width') : ?>

          <div class="cd-hero__content cd-hero__content--half-width cd-hero__content--img">
            <?php echo render_image_component($slide['image']); ?>
          </div> <!-- .cd-hero__content -->

        <?php endif; ?>
      </li> 
    <?php endforeach; ?>
  </ul>

  <div class="cd-hero__nav js-cd-nav">
			<nav>
				<span class="cd-hero__marker cd-hero__marker--item-1 js-cd-marker"></span>
				
				<ul>
					<li class="cd-selected"><a href="#0">Intro</a></li>
					<li><a href="#0">Tech 1</a></li>
					<li><a href="#0">Video</a></li>
					<li><a href="#0">Image</a></li>
				</ul>
			</nav> 
		</div> <!-- .cd-hero__nav -->
