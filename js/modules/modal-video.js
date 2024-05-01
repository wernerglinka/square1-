/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { closeModal } from './helpers/modal';

const modalVideo = ( function () {
  const init = function () {
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-video' );
    // if no video trigger links on page return
    if ( modalVideoTriggers.length < 1 ) {
      return;
    }
    const videoOverlay = document.getElementById( 'video-overlay' );
    const closeVideoOverlay = videoOverlay.querySelector( '.close' );

    // add eventlisteners to everty video trigger link
    modalVideoTriggers.forEach( ( trigger ) => {
      trigger.addEventListener( 'click', ( e ) => {
        if ( e.target.matches( '.js-modal-video, .js-modal-video * ' ) ) {
          const thisTrigger = e.target.closest( '.js-modal-video' );
          const requestedVideoID = thisTrigger.dataset.videoid;

          console.log( 'prevent default' );
          e.preventDefault();
          e.stopPropagation();

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

          // get the src string attribute for the video source
          let url;
          switch ( thisTrigger.dataset.videosrc ) {
            case 'youtube':
              url = `https://www.youtube.com/embed/${ requestedVideoID }`;
              break;
            case 'vimeo':
              url = `https://player.vimeo.com/video/${ requestedVideoID }`;
              break;
            case 'cloudinary':
              url = `https://player.cloudinary.com/embed/?cloud_name=demo&public_id=${ requestedVideoID }`;
              break;
            default:
              url = '';
              break;
          }

          const newIFrame = `
            <iframe
              src=${ url }
              width="640"
              height="360"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              frameborder="0"
              allowfullscreen></iframe>
          `;
          // insert iframe into the video-container in the overlay
          document.querySelector( '#video-overlay .video-container' ).innerHTML = newIFrame;
        } else {
          console.log( 'not a video trigger link' );
        }
      } );
    } );

    // the video overlay is outside the content area, thus is permanent for all pages
    // ergo we can attach the event handler directly to the element

    // close video overlay when close link is clicked
    closeVideoOverlay.addEventListener( 'click', () => {
      closeModal();
    } );
  };

  return {
    init,
  };
}() );

export default modalVideo;
