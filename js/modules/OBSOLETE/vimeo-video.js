/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global Vimeo */

import { createElementWithId, fadeInElement, attachEventOnce } from '../helpers/dom';
import { closeModal } from '../helpers/modal';

/**
 * @function modalVimeoVideo
 * @description: Opens a modal overlay with a vimeo video player
 * @requires: loadScript
 * @requires: vimeo-video-player.min.js
 * @requires: vimeo-video-player.min.css
 * This implementation uses a self-hosted player ( a video HTML element) by
 * including the vimeo Video Player JavaScript library, allowing
 * full control of all video player instances.
 * @reference: https://developer.vimeo.com/player/sdk/basics
 */
const modalVimeoVideo = ( function () {
  const handleTriggerClick = ( e, index, videoSource ) => {
    e.preventDefault();
    e.stopPropagation();

    // find the closest parent element with the class of js-modal-youtube-video
    if ( e.target.matches( `.js-modal-${ videoSource }-video, .js-modal-${ videoSource }-video *` ) ) {
      const trigger = e.target.closest( `.js-modal-${ videoSource }-video` );
      const videoId = trigger.dataset.videoid;

      // Add the target element for the video player in the overlay
      const videoTarget = createElementWithId( 'div', `${ videoSource }-video-target-${ index }` );
      document.querySelector( '#video-overlay .video-container' ).appendChild( videoTarget );

      // Fade in the overlay
      const videoOverlay = document.getElementById( 'video-overlay' );
      fadeInElement( videoOverlay, 'is-open', () => {
        document.body.classList.add( 'modal-active' );
      } );

      // Load the video player
      loadVimeoPlayer( index, videoId );
    }
  };
  const init = function () {
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-vimeo-video' );
    const closeVideoOverlay = document.getElementById( 'video-overlay' ).querySelector( '.close' );

    // add eventlisteners to vimeo everty video trigger link
    modalVideoTriggers.forEach( ( trigger, index ) => {
      const videoSource = trigger.dataset.videosrc;
      trigger.addEventListener( 'click', ( e ) => handleTriggerClick( e, index, videoSource ) );
    } );

    // close video overlay when close link is clicked
    closeVideoOverlay.addEventListener( 'click', closeModal );
  };

  return {
    init,
  };
}() );

export default modalVimeoVideo;
