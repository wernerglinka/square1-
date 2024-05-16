<?php
/**
 * Page section for displaying a section with text and image
 * 
 * @package square1
 */

  $props = $args['props'];
  $text = $props['text'];
  $image = $props['image'];
  $has_image = $image['id'] ?? false;
  $ctas = isset($props['ctas']) && is_array($props['ctas']) ? $props['ctas'] : [];
  $hasCTAs = count($ctas) > 0;

  //echo "<pre>";
  //print_r($props);
  //echo "</pre>";
?>

  <div class="text">
    <?php echo render_text_component($text);?>
    <?php if ($hasCTAs): ?>
      <div class="ctas-container">
      <?php foreach ($ctas as $cta): ?>
        <?php echo render_cta_component($cta);?>
      <?php endforeach;?>
      </div>
    <?php endif;?>
  </div>

  <?php if ($has_image): ?>
    <div class="image">
      <?php echo render_image_component($image);?>
    </div><!-- .image -->
  <?php endif;?>