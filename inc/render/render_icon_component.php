<?php
  include_once 'particles/get_icon.php';
  
  /**
   * Render an icon component
   */
  function render_icon_component($icon) {
    if (!isset($icon['icon'])) {
        return;
    }
    return get_icon($icon['icon']);
  }
