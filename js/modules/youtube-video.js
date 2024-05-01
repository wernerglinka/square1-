/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global YT */

import loadYouTubeAPI from './helpers/load-youtube-api';
import { createElementWithId, fadeInElement, attachEventOnce } from './helpers/dom';
import { closeModal } from './helpers/modal';

/**
 * @function modalYoutubePlayer
 * @description: Opens a modal overlay with a youtube video player
 * @requires: loadYouTubeAPI, helpers utilities, modal utilities
 * 
 */
const modalYoutubePlayer = ( () => {
  let player;

  /** 
   * -1 – UNDSTARTED
   * 0 – ENDED
   * 1 – PLAYING
   * 2 – PAUSED
   * 3 – BUFFERING
   * 5 – VIDEO CUED 
   */
  const handlePlayerStateChange = ( event ) => {
    // close the overlay when the video ends
    if ( event.data === YT.PlayerState.ENDED ) {
      closeModal();
    }
  };

  const startVideo = () => {
    player.playVideo();
  };

  const createPlayer = ( videoId, containerId, playerOptions ) => {
    player = new YT.Player( containerId, {
      videoId,
      host: 'https://www.youtube.com',
      ...playerOptions,
      events: {
        onReady: startVideo,
        onStateChange: handlePlayerStateChange,
      },
    } );
  };

  const handleTriggerClick = ( e, index ) => {
    e.preventDefault();
    e.stopPropagation();

    // find the closest parent element with the class of js-modal-video
    if ( e.target.matches( '.js-modal-youtube-video, .js-modal-youtube-video *' ) ) {
      const trigger = e.target.closest( '.js-modal-youtube-video' );
      const videoId = trigger.dataset.videoid;
      const startTime = trigger.dataset.starttime || null;
      const endTime = trigger.dataset.endtime || null;

      // Add the target element for the video player in the overlay
      const videoTarget = createElementWithId( 'div', `video-target-${ index }` );
      document.querySelector( '#video-overlay .video-container' ).appendChild( videoTarget );

      // Fade in the overlay
      const videoOverlay = document.getElementById( 'video-overlay' );
      fadeInElement( videoOverlay, 'is-open', () => {
        document.body.classList.add( 'modal-active' );
      } );

      // Load the video player
      loadYouTubeAPI().then( () => {
        const playerOptions = {
          autoplay: 0,
          start: startTime,
          end: endTime,
          controls: 1,
          enablejsapi: 1,
          wmode: 'opaque',
          origin: window.location.origin,
          rel: 0,
        };

        createPlayer( videoId, `video-target-${ index }`, playerOptions );
      } );
    }
  };

  const init = () => {
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-youtube-video' );
    const closeVideoOverlay = document.getElementById( 'video-overlay' ).querySelector( '.close' );

    modalVideoTriggers.forEach( ( trigger, index ) => {
      trigger.addEventListener( 'click', ( e ) => handleTriggerClick( e, index ) );
    } );

    closeVideoOverlay.addEventListener( 'click', closeModal );
  };

  return {
    init,
  };
} )();

export default modalYoutubePlayer;