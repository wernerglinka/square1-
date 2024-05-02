/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global cloudinary */

import { createElementWithId, fadeInElement, attachEventOnce } from '../helpers/dom';
import { closeModal } from '../helpers/modal';
import loadCloudinaryPlayer from '../modal/cloudinary';

/**
 * @function modalCloudinaryVideo
 * @description: Opens a modal overlay with a cloudinary video player
 * @requires: loadScript
 * @requires: cloudinary-video-player.min.js
 * @requires: cloudinary-video-player.min.css
 * This implementation uses a self-hosted player ( a video HTML element) by
 * including the Cloudinary Video Player JavaScript library, allowing
 * full control of all video player instances.
 * @reference: https://cloudinary.com/documentation/video_player_how_to_embed#self_hosted_player
 */
const modalCloudinaryVideo = ( function () {
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
      loadCloudinaryPlayer( index, videoId );
    }
  };

  const init = () => {
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-cloudinary-video' );
    const closeVideoOverlay = document.getElementById( 'video-overlay' ).querySelector( '.close' );

    // add eventlisteners to everty youtube video trigger link
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

export default modalCloudinaryVideo;
