/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global Vimeo */
import loadScript from './load-script';
import closeModal from './close-modal';

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
  const init = function () {
    console.log( 'modalVimeoVideo Init' );

    // get all the video trigger links
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-vimeo-video' );

    // if no video trigger links on page return
    if ( modalVideoTriggers.length < 1 ) {
      return;
    }

    // load the vimeo video player API
    const loadingVimeo = loadScript( 'https://player.vimeo.com/api/player.js' );

    // get the video overlay element and the close link
    const videoOverlay = document.getElementById( 'video-overlay' );
    const closeVideoOverlay = videoOverlay.querySelector( '.close' );

    // add eventlisteners to everty video trigger link
    modalVideoTriggers.forEach( ( trigger ) => {
      trigger.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        e.stopPropagation();

        // find the closest parent element with the class of js-modal-vimeo-video
        // that is the link that was clicked
        if ( e.target.matches( '.js-modal-vimeo-video, .js-modal-vimeo-video * ' ) ) {
          const thisTrigger = e.target.closest( '.js-modal-vimeo-video' );
          const requestedVideoID = thisTrigger.dataset.videoid;

          // add the target element for the video player in the overlay
          const videoTarget = document.createElement( 'div' );
          videoTarget.id = 'vimeo-player';
          document.querySelector( '#video-overlay .video-container' ).appendChild( videoTarget );

          // fade in the overlay
          videoOverlay.addEventListener(
            'animationend',
            () => {
              videoOverlay.classList.add( 'is-open' );
              videoOverlay.classList.remove( 'fadein' );
            },
            { once: true }
          );
          videoOverlay.classList.add( 'fadein' );

          // prevent scrolling under the overlay
          document.body.classList.add( 'modal-active' );

          loadingVimeo
            .then( () => {
              const vimeoPlayer = new Vimeo.Player( 'vimeo-player', {
                id: requestedVideoID,
                width: 640,
                height: 360,
                autoplay: false,
                muted: false,
              } );

              // Start playing the video manually! If the video is set to autoplay
              // the video will start playing automatically but none of the event
              // will work!
              vimeoPlayer.play();

              vimeoPlayer.on( 'ended', closeModal );
            } )
            .catch( ( error ) => {
              console.error( `Error loading script: ${ error }` );
            } );
        }
      } );
    } );

    // close video overlay when close link is clicked
    closeVideoOverlay.addEventListener( 'click', () => {
      closeModal();
    } );
  };

  return {
    init,
  };
}() );

export default modalVimeoVideo;
