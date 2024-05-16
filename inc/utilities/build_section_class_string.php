<?php 
  function build_section_class_string($params) {
    $classes = [];
    $fields = $params['common_section_fields'] ?? [];

    if (!empty($fields['section_type'])) {
      $classes[] = $fields['section_type'];
    }

    if (!empty($fields['section_direction'])) {
      $classes[] = 'is-reversed';
    }

    $settings = $fields['settings'] ?? [];
    $settingsClasses = [
      'in_container' => 'in-container',
      'no_top_margin' => 'no-top-margin',
      'no_bottom_margin' => 'no-bottom-margin',
      'narrow_width' => 'narrow-width',
      'wide_width' => 'wide-width',
    ];

    foreach ($settingsClasses as $setting => $class) {
      if (in_array($setting, $settings)) {
        $classes[] = $class;
      }
    }

    if (!empty($fields['background_is_dark'])) {
      $classes[] = 'is-dark';
    }

    if (!empty($params['is_horizontal'])) {
      $classes[] = 'is-horizontal';
    }

    if (!empty($fields['section_classes'])) {
      $classes[] = $fields['section_classes'];
    }

    if (!empty($fields['background_color']) && $fields['background_color'] !== 'none') {
      $classes[] = 'has-background-color';
    }

    if (!empty($fields['background_image']['id'])) {
      $classes[] = 'has-background-image';
    }

    if (!empty($fields['background_pattern']['css_pattern']) && $fields['background_pattern']['css_pattern'] !== 'none') {
      $classes[] = $fields['background_pattern']['css_pattern'];
    }

    if (!empty($fields['screen']['has_screen'])) {
      $classes[] = $fields['screen']['dark_screen'] ? 'has-dark-screen' : 'has-light-screen';
    }

    return implode(' ', $classes);
  }