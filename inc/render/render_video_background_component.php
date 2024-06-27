<?php
  /**
   * Render an video with its JS API component with optional thumbnail
   */
  function render_video_background_component($video, $slide_index = 0) {
    extract($video);

    $video_thumbnail = wp_get_attachment_image($thumbnail['id'], 'large', false, ['alt' => $thumbnail['alt_text']]);
    $cloudinary_cloud_name = isset($cloudinary_cloud_name) ? 'data-cloudname="' . $cloudinary_cloud_name . '"' : '';

    $output = <<<EOT

      <div 
        id="background-video-{$slide_index}" 
        class="js-inline-video js-background-video is-background-video inline-video-wrapper" 
        data-videoid="{$id}" 
        data-videosrc="{$source}" 
        $cloudinary_cloud_name
      ></div>
      $video_thumbnail

    EOT;

    return $output;
  }