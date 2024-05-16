<?php
  /**
   * Render a lottie animation component
   */
  function render_lottie_component($lottie) {
    if (!isset($lottie['source'])) {
      return;
    }

    $source = $lottie['source'];

    $output = <<<LOTTIEPLAYER
      <lottie-player class='js-lottie' src='{$source}' background='transparent' speed='1' autoplay=true loop=true></lottie-player>
    LOTTIEPLAYER;

    return $output;
  }