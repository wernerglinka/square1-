import navigation from './modules/navigation';
import sectionAnimation from './modules/section-animation';
import mobileFlipCardSupport from './modules/mobileFlipcardSupport';
import tabs from './modules/tabs';
import lottieAnimations from './modules/lottieAnimation';
import youtubeVideo from './modules/youtube';
import cloudinaryVideo from './modules/cloudinary';
import vimeoVideo from './modules/vimeo';

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

  if ( document.querySelector( '.js-youtube-video' ) ||
    document.querySelector( '.js-cloudinary-video' ) ||
    document.querySelector( '.js-vimeo-video' ) ) {
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

  if ( document.querySelector( '.js-youtube-video' ) ) {
    youtubeVideo.init();
  }

  if ( document.querySelector( '.js-cloudinary-video' ) ) {
    cloudinaryVideo.init();
  }

  if ( document.querySelector( '.js-vimeo-video' ) ) {
    vimeoVideo.init();
  }
}

window.addEventListener( 'load', function () {
  initPage();
} );

