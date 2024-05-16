<?php
  /**
   * Page section for displaying an alert bar
   * 
   * @package square1
   */

    $props = $args['props'];

    //echo "<pre>";
    //print_r($props);
    //echo "</pre>";

    $message = $props['message'];
    $link_url = $props['link']['url'];
    $link_text = $props['link']['title'];
    $link_attributes = $props['link']['target'] ? 'target="_blank" rel="noopener noreferrer"' : '';
    $external_icon = $props['link']['target'] ? '<span class="is-external">' . get_icon('external-link') . '</span>' : '';
?>
<div class="container">
  <p class="message">
    <?php echo $message; ?>
    <a href="<?php  echo $link_url; ?>" <?php echo $link_attributes ; ?>>
      <?php echo $link_text; ?>
      <?php echo $external_icon; ?>
    </a>
  </p>
</div>
