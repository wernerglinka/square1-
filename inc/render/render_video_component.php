<?php
  /**
   * Render an video with its JS API component with optional thumbnail
    */
  function render_video_component($video) {
    extract($video);

    $video_thumbnail = wp_get_attachment_image($thumbnail['id'], 'large', false, ['alt' => $thumbnail['alt_text']]);

    if ($inline) {
        $output = <<<EOT

          <div class="js-inline-video inline-video-wrapper" data-videoid="{$id}" data-videosrc="{$source}">
            <span class="close">X</span>
          </div>
         
          <button class="video-trigger">
            <div class="play-button"></div>
            $video_thumbnail
          </button>

      EOT;

    } else {
        $output = <<<EOT
        <button class="js-modal-video" data-videoid="{$id}" data-videosrc="{$source}">
          <div class="play-button"></div>
          $video_thumbnail
        </button>
      EOT;
    }
    return $output;
  }
