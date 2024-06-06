/* eslint-disable space-before-function-paren */
import navigation from './modules/navigation';
import sectionAnimation from './modules/section-animation';
import flipCards from './modules/flipcards';
import tabs from './modules/tabs';
import lottieAnimations from './modules/lottieAnimation';
import modalVideo from './modules/modal-video';
import inlineVideo from './modules/inline-video';
import imagesGallery from './modules/galleries/images';
import filterizrGallery from './modules/galleries/filterizr';
import isotopeGallery from './modules/galleries/isotope';
import imageSlider from './modules/image-slider';
import faqs from './modules/faqs';
import heroSlider from './modules/hero-slider';
import imageComparison from './modules/image-comparison';
import spinSandBox from './modules/spinning-image';
import marquees from './modules/marquee';

function initPage() {
  // Remove no-js class
  document.querySelector( 'html' ).classList.remove( 'no-js' );

  navigation.init();
  sectionAnimation.init();

  if ( document.querySelector( '.flip-card-wrapper' ) ) {
    flipCards.init();
  }

  if ( document.querySelector( '.js-tabs' ) ) {
    tabs.init();
  }

  if ( document.querySelector( '.js-lottie' ) ) {
    // Load the lottie player script with a callback when loaded
    const script = document.createElement( 'script' );
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.onload = function() {
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

  if ( document.querySelector( '.js-images-gallery-container' ) ) {
    imagesGallery.init();
  }

  if ( document.querySelector( '.js-filterizr-gallery-container' ) ) {
    filterizrGallery.init();
  }

  if ( document.querySelector( '.js-isotope-gallery-container' ) ) {
    isotopeGallery.init();
  }

  if ( document.querySelector( '.js-image-slider' ) ) {
    imageSlider.init();
  }

  if ( document.querySelector( '.js-faqs' ) ) {
    faqs.init();
  }

  if ( document.querySelector( '.hero-slider' ) ) {
    heroSlider.init();
  }

  if ( document.querySelector( '.image-comparison-container' ) ) {
    imageComparison.init();
  }

  if ( document.querySelector( '.imageSpinContainer' ) ) {
    spinSandBox.init();
  }

  if ( document.querySelector( '.js-logos' ) ) {
    marquees.init();
  }
}

window.addEventListener( 'load', function() {
  initPage();
} );

