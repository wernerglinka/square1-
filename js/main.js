import navigation from './modules/navigation';
import sectionAnimation from './modules/section-animation';
import mobileFlipCardSupport from './modules/mobileFlipcardSupport';
import tabs from './modules/tabs';
import lottieAnimations from './modules/lottieAnimation';
import youtubeVideo from './modules/youtube';

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
      console.log( 'lottie player loaded' );
      lottieAnimations.init();
    };
    document.head.appendChild( script );
  }

  if ( document.querySelector( '.js-youtube-video' ) ) {
    // load the YouTube video JS api
    // https://developers.google.com/youtube/iframe_api_reference
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement( 'script' );
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
    firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

    // use a promise to manage the async onYouTubeIframeAPIReady function
    window.videoAPIReady = new Promise( ( resolve ) => {
      // upon YouTube API Ready we resolve the promise
      // we can then initialize video players in other modules
      // e.g. videoAPIReady.then(() => {})
      window.onYouTubeIframeAPIReady = resolve;
    } );

    // create an video overlay and add to DOM if it doesn't already exist
    if ( !document.querySelector( '#video-overlay' ) ) {
      const newVideoOverlay = `
        <div id="video-overlay" class="js-video-overlay">
          <span class="close">[Close]</span>
          <div class="responsive-wrapper">
            <div class="video-container">
              <div id="ytvideo"></div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML( 'beforeend', newVideoOverlay );
    }

    youtubeVideo.init();
  }
}

window.addEventListener( 'load', function () {
  initPage();
} );

