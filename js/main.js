/* eslint-disable space-before-function-paren */
import navigation from './modules/navigation';
import sectionAnimation from './modules/section-animation';
import mobileFlipCardSupport from './modules/mobileFlipcardSupport';
import tabs from './modules/tabs';
import lottieAnimations from './modules/lottieAnimation';
import modalVideo from './modules/modal-video';
import inlineVideo from './modules/inline-video';

import modalCloudinaryVideo from './modules/cloudinary-video';
import modalYoutubeVideo from './modules/youtube-video';
import modalVimeoVideo from './modules/vimeo-video';

function initPage() {
  navigation.init();
  sectionAnimation.init();

  if ( document.querySelector( '.flip-card-wrapper' ) ) {
    mobileFlipCardSupport.init();
  }

  if ( document.querySelector( '.js-tabs' ) ) {
    tabs.init();
  }

  if ( document.querySelector( '.js-lottie' ) ) {
    // Load the lottie player script with a callback when loaded
    const script = document.createElement( 'script' );
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.onload = function () {
      lottieAnimations.init();
    };
    document.head.appendChild( script );
  }

  if ( document.querySelector( '.js-modal-video' ) ||
    document.querySelector( '.js-modal-cloudinary-video' ) ||
    document.querySelector( '.js-modal-youtube-video' ) ||
    document.querySelector( '.js-modal-vimeo-video' ) ) {
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
  }

  if ( document.querySelector( '.js-modal-video' ) ) {
    modalVideo.init();
  }

  if ( document.querySelector( '.js-inline-video' ) ) {
    inlineVideo.init();
  }

  if ( document.querySelector( '.js-modal-cloudinary-video' ) ) {
    modalCloudinaryVideo.init();
  }

  if ( document.querySelector( '.js-modal-youtube-video' ) ) {
    modalYoutubeVideo.init();
  }

  if ( document.querySelector( '.js-modal-vimeo-video' ) ) {
    modalVimeoVideo.init();
  }
}

window.addEventListener( 'load', function () {
  initPage();
} );

