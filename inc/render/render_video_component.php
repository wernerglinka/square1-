<?php
  /**
   * Render an video with its JS API component with optional thumbnail
    */
  function render_video_component($video) {
    extract($video);

    $video_thumbnail = wp_get_attachment_image($thumbnail['id'], 'large', false, ['alt' => $thumbnail['alt_text']]);
    $cloudinary_cloud_name = isset($cloudinary_cloud_name) ? 'data-cloudname="' . $cloudinary_cloud_name . '"' : '';

    if ($inline) {
        $output = <<<EOT

          <div class="js-inline-video inline-video-wrapper" data-videoid="{$id}" data-videosrc="{$source}" $cloudinary_cloud_name>
            <span class="close">X</span>
          </div>
         
          <button class="video-trigger">
            <div class="play-button"></div>
            $video_thumbnail
          </button>

      EOT;

    } else {
        $output = <<<EOT
        <button class="js-modal-video" data-videoid="{$id}" data-videosrc="{$source}" $cloudinary_cloud_name>
          <div class="play-button"></div>
          $video_thumbnail
        </button>
      EOT;
    }
    return $output;
  }
