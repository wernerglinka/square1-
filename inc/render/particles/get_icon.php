<?php
  function get_icon($icon) {
    $icon_path = get_template_directory() . '/icons/' . $icon . ".svg";
    return file_get_contents($icon_path);
  }
