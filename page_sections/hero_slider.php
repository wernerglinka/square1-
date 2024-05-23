<?php
/**
 * Page section for displaying a section with one or more images
 * 
 * @package square1
 */

$props = $args['props'];
$slides = $props['slides'];
?>

<ul class="hero-slider-list">
  <?php 
    foreach($slides as $index => $slide) :
      $has_ctas = isset($slide['ctas']) && is_array($slide['ctas']) && count($slide['ctas']) > 0;
      $ctas = $has_ctas ? $slide['ctas'] : [];
      $has_text = count(array_filter($slide['text'])) !== 0 || $has_ctas;
      $has_image = !empty($slide['image']['id']);
      $has_text_and_image = $has_text && $has_image;
      $content_width = $has_text_and_image ? 'is-half-width' : 'is-full-width';
      $has_background_image = !empty($slide['slide_background']['background_image']['id']);
      $has_background_video = !empty($slide['slide_background']['background_video']['id']);
      $has_background_color = !empty($slide['slide_background']['background_color']);
      $has_media_background = $has_background_image || $has_background_video;
      $background_screen = $slide['slide_background']['screen'];
      $has_background_screen = $background_screen['has_screen'];
      $screen_color = $has_background_screen && $background_screen['dark_screen'] ? 'has-dark-screen' : 'has-light-screen';
      $has_background = $has_background_image || $has_background_video || $has_background_color;
      $background_is_dark = $has_background_color ? $slide['slide_background']['background_is_dark'] : false;
  ?>
    <li 
      class="hero-slide <?php if($index === 0) echo 'is-selected'; if ($background_is_dark) echo ' is-dark'; ?> js-slide" 
      <?php if($has_background) echo 'style="background-color: ' . esc_attr($slide['slide_background']['background_color']) . ';"'; ?>
    >
      <?php if ($has_media_background) : ?>
        <div class="media-background <?php if($has_background_screen) echo $screen_color; ?>">
          <?php
            if($has_background_image) {
              echo render_image_component($slide['slide_background']['background_image']);
            } else if($has_background_video) {
              echo render_video_component($slide['slide_background']['background_video']);
            }
          ?>
        </div>
      <?php endif; ?>
      
      <div class="container">
        <div class="hero-content <?php echo $content_width; ?>">
          <?php echo render_text_component($slide['text']); ?>

          <?php if ($has_ctas): ?>
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