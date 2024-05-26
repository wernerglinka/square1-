
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import youtubePlayer from '../modal/youtube';
import vimeoPlayer from '../modal/vimeo';
import cloudinaryPlayer from '../modal/cloudinary';
import { createElementWithId, fadeInElement, attachEventOnce } from '../helpers/dom';
import { closeModal } from '../helpers/modal';

const modalVideos = ( () => {
  const videoProviderMap = {
    cloudinary: cloudinaryPlayer,
    youtube: youtubePlayer,
    vimeo: vimeoPlayer,
  };

  const loadVideoPlayer = ( videoInstance, index ) => {
    const providerId = videoInstance.dataset.videosrc;
    const videoId = videoInstance.dataset.videoid;
    const cloudName = videoInstance.dataset.cloudname;
    const videoProvider = videoProviderMap[ providerId ];

    if ( videoProvider ) {
      videoProvider( index, videoId, cloudName );
    } else {
      console.warn( `Unsupported video provider: ${ providerId }` );
    }
  };

  const handleTriggerClick = ( e, index, videoSource ) => {
    e.preventDefault();
    e.stopPropagation();

    // find the closest parent element with the class of js-modal-youtube-video
    if ( e.target.matches( `.js-modal-video, .js-modal-video *` ) ) {
      const videoLink = e.target.closest( `.js-modal-video` );

      // Add the target element for the video player in the overlay
      // Youtube and Cloudinary will replace the target element with the video player
      // Vimeo will append the video player to the target element
      const videoTarget = createElementWithId( 'div', `${ videoSource }-video-target-${ index }` );
      document.querySelector( '#video-overlay .video-container' ).appendChild( videoTarget );

      // Fade in the overlay
      const videoOverlay = document.getElementById( 'video-overlay' );
      fadeInElement( videoOverlay, 'is-open', () => {
        document.body.classList.add( 'modal-active' );
      } );

      // Load the video player
      loadVideoPlayer( videoLink, index );
    }
  };

  const init = () => {
    // create an video overlay and add to DOM
    const newVideoOverlay = `
        <div id="video-overlay" class="js-video-overlay">
          <span class="close">[Close]</span>
          <div class="responsive-wrapper">
            <div class="video-container"></div>
          </div>
        </div>
      `;
    document.body.insertAdjacentHTML( 'beforeend', newVideoOverlay );

    const modalVideoTriggers = document.querySelectorAll( '.js-modal-video' );
    const closeVideoOverlay = document.getElementById( 'video-overlay' ).querySelector( '.close' );

    // add eventlisteners to every modal video link
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
} )();

export default modalVideos;
