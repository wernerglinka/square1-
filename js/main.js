/* eslint-disable space-before-function-paren */
import navigation from './modules/navigation';
import sectionAnimation from './modules/section-animation';
import mobileFlipCardSupport from './modules/mobileFlipcardSupport';
import tabs from './modules/tabs';
import lottieAnimations from './modules/lottieAnimation';
import modalVideo from './modules/modal-video';
import inlineVideo from './modules/inline-video';

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

  if ( document.querySelector( '.js-modal-video' ) ) {
    modalVideo.init();
  }

  if ( document.querySelector( '.js-inline-video' ) ) {
    inlineVideo.init();
  }
}

window.addEventListener( 'load', function () {
  initPage();
} );

