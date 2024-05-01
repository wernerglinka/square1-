import loadScript from './load-script';

function loadYouTubeAPI() {
  return loadScript( 'https://www.youtube.com/iframe_api' ).then( () => {
    return new Promise( ( resolve ) => {
      const checkYTReady = () => {
        if ( window.YT && window.YT.Player ) {
          resolve();
        } else {
          setTimeout( checkYTReady, 100 ); // Check again in 100ms
        }
      };
      checkYTReady();
    } );
  } );
}

export default loadYouTubeAPI;
