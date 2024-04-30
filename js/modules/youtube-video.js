/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global YT */
import loadScript from './load-script';
import closeModal from './close-modal';

/**
 * @function modalYoutubeVideo
 * @description: Opens a modal overlay with a youtube video player
 * @requires: loadScript
 * @requires: https://www.youtube.com/iframe_api
 * This implementation uses an iFrame player by including the
 * IFrame Player API library, allowing full control of all video player
 * instances.
 * @reference: https://developers.google.com/youtube/iframe_api_reference
 */
const modalYoutubeVideo = ( () => {
  let player;

  const onPlayerStateChange = ( event ) => {
    // close the overlay when the video ends
    if ( event.data === YT.PlayerState.ENDED ) {
      closeModal();
    }
  };

  const init = () => {
    console.log( 'modalYoutubeVideo Init' );

    // get all the video trigger links
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-youtube-video' );

    // if no video trigger links on page return
    if ( modalVideoTriggers.length < 1 ) {
      return;
    }

    // load the youtube IFrame Player API
    // loadingYoutube is a Promise that resolves when the YouTube IFrame Player API has loaded.
    loadScript( 'https://www.youtube.com/iframe_api' );

    // videoAPIReady is a Promise that resolves when the YouTube API is ready.
    window.videoAPIReady = new Promise( ( resolve ) => {
      window.onYouTubeIframeAPIReady = () => resolve();
    } );

    // get the video overlay element and the close link
    const videoOverlay = document.getElementById( 'video-overlay' );
    const closeVideoOverlay = videoOverlay.querySelector( '.close' );

    // add eventlisteners to everty video trigger link
    modalVideoTriggers.forEach( ( trigger ) => {
      trigger.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        e.stopPropagation();

        // find the closest parent element with the class of js-modal-youtube-video
        // that is the link that was clicked
        if ( e.target.matches( '.js-modal-youtube-video, .js-modal-youtube-video * ' ) ) {
          const thisTrigger = e.target.closest( '.js-modal-youtube-video' );
          const requestedVideoID = thisTrigger.dataset.videoid;
          const startTime = thisTrigger.dataset.starttime || null;
          const endTime = thisTrigger.dataset.endtime || null;

          // add the target element for the video player in the overlay
          const videoTarget = document.createElement( 'div' );
          videoTarget.id = 'ytvideo';
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

          // load the youtube player
          window.videoAPIReady.then( () => {
            const playerVars = {
              autoplay: 1,
              start: startTime,
              end: endTime,
              controls: 1,
              enablejsapi: 1,
              wmode: 'opaque',
              origin: window.location.origin,
              rel: 0,
            };

            player = new YT.Player( 'ytvideo', {
              videoId: requestedVideoID,
              host: 'https://www.youtube.com',
              playerVars,
              events: {
                onStateChange: onPlayerStateChange,
              },
            } );
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
} )();

export default modalYoutubeVideo;
