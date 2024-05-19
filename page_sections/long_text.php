<?php
/**
 * Page section for displaying a long text section
 * 
 * @package square1
 */

  $props = $args['props'];
  $text = $props['text'];

?>
<div class="container">
  <div class="text">
    <?php echo render_text_component($text); ?>
  </div>
</div>


