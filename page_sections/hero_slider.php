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


  <ul class="hero-slider-list">
    <?php 
      foreach($slides as $index => $slide) :
        // check if there are any CTAs
        $has_ctas = isset($slide['ctas']) && is_array($slide['ctas']) && count($slide['ctas']) > 0;
        // check if there is at least one text field. All text fields are optional or a CTA
        $has_text = count(array_filter($slide['text'])) !== 0 || $has_ctas;
        // check if there is an image
        $has_image = !empty($slide['image']['id']) &&  isset($slide['image']['id']);
        $has_text_and_image = $has_text && $has_image;
        $content_width = $has_text_and_image ? 'is-half-width' : 'is-full-width';
        // check if there is a background image
        $has_background_image = !empty($slide['slide_background']['background_image']['id']);
        // check if there is a background video
        $has_background_video = !empty($slide['slide_background']['background_video']['id']);
        // check if there is a background color
        $has_background_color = !empty($slide['slide_background']['background_color']);
        
        // check if there is a background image or video
        $has_background = $has_background_image || $has_background_video || $has_background_color;
        $background_is_dark = $has_background ? $slide['slide_background']['background_is_dark'] : false;

    ?>
      <li 
        class="hero-slide <?php if($index === 0) echo 'is-selected'; if ($background_is_dark) echo ' is-dark'; ?> js-slide" 
        <?php if($has_background) echo 'style="background-color: ' . $slide['slide_background']['background_color'] . ';"'; ?>
      >
        <div class="container">
          <div class="hero-content <?php echo $content_width; ?>">
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
          </div> <!-- .hero-content -->
        
          <?php if($content_width === 'is-half-width') : ?>
            <div class="hero-content is-half-width has-image">
              <?php echo render_image_component($slide['image']); ?>
            </div> <!-- .hero-content -->
          <?php endif; ?>
        </div> <!-- .container -->
      </li> 
    <?php endforeach; ?>
  </ul>

  <div class="hero__nav js-nav">
			<nav>
				<span class="hero__marker hero__marker--item-1 js-marker"></span>
				
				<ul>
					<li class="is-selected"><a href="#0">Intro</a></li>
					<li><a href="#0">Tech 1</a></li>
					<li><a href="#0">Video</a></li>
					<li><a href="#0">Image</a></li>
				</ul>
			</nav> 
		</div> <!-- .hero__nav -->
