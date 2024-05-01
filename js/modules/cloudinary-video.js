/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global cloudinary */
import loadScript from './helpers/load-script';
import loadStyles from './helpers/load-styles';
import { closeModal } from './helpers/modal';

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
  const init = function () {
    console.log( 'modalCloudinaryVideo Init' );

    // get all the video trigger links
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-cloudinary-video' );

    // if no video trigger links on page return
    if ( modalVideoTriggers.length < 1 ) {
      return;
    }

    // load the cloudinary video player API
    const loadingCloudinary = loadScript( 'https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js', 'cloudinary' );
    // Add the cloudinary player styles
    loadStyles( 'https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css' );

    // get the video overlay element and the close link
    const videoOverlay = document.getElementById( 'video-overlay' );
    const closeVideoOverlay = videoOverlay.querySelector( '.close' );

    // add eventlisteners to everty video trigger link
    modalVideoTriggers.forEach( ( trigger, index ) => {
      trigger.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        e.stopPropagation();

        // find the closest parent element with the class of js-modal-cloudinary-video
        // that is the link that was clicked
        if ( e.target.matches( '.js-modal-cloudinary-video, .js-modal-cloudinary-video * ' ) ) {
          const thisTrigger = e.target.closest( '.js-modal-cloudinary-video' );
          const videoID = thisTrigger.dataset.videoid;

          // add the target element for the video player in the overlay
          const videoTarget = document.createElement( 'div' );
          videoTarget.id = `cloudinary-video-player-modal`;
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

          loadingCloudinary
            .then( () => {
              const videoTag = `
              <video
                id=demo-player-modal-${ index }
                controls
                autoplay
                class="cld-video-player"
                data-cld-public-id=${ videoID }
              ></video>`;

              // add this video tag to the video target
              document.getElementById( `cloudinary-video-player-modal` ).innerHTML = videoTag;

              // instantiate the cloudinary video player
              const player = cloudinary.videoPlayer( `demo-player-modal-${ index }`, {
                cloudName: 'demo',
                playedEventPercents: [ 100 ]
              } );

              // add event listener for end of playback
              player.on( 'percentsplayed', ( event ) => {
                closeModal();
              } );
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

export default modalCloudinaryVideo;
