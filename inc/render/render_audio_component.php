<?php
  /**
   * Render an audio component with optional thumbnail
   */
  function render_audio_component($audio) {
    if (!isset($audio['source'])) {
        return;
    }

    // get the audio file extension so we can form the proper mime type
    // the url may include a query parameter, so we use parse_url to get the path
    $audio_path = parse_url($audio['source'])['path'];
    $audio_file_extension = trim(pathinfo($audio_path)['extension']);

    $source = esc_url($audio['source']);
    $type = esc_attr($audio_file_extension);

    $output = <<<AUDIO
      <audio controls>
        <source src="{$source}" type="audio/{$type}"/>
        Your browser does not support the audio element.
      </audio>
    AUDIO;

    return $output;
  }