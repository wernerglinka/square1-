const youtubeVideo = ( () => {
  let player;

  const initVideoLinks = () => {
    const videoOverlay = document.getElementById( 'video-overlay' );
    const closeVideoOverlay = videoOverlay.querySelector( '.close' );

    document.addEventListener( 'click', ( e ) => {
      if ( e.target.matches( '.js-modal-youtube-video, .js-modal-youtube-video *' ) ) {
        const thisTrigger = e.target.closest( '.js-modal-youtube-video' );
        const { videoid: requestedVideoID, startTime, endTime } = thisTrigger.dataset;

        e.preventDefault();
        e.stopPropagation();

        videoOverlay.addEventListener(
          'animationend',
          () => {
            videoOverlay.classList.add( 'is-open' );
            videoOverlay.classList.remove( 'fadein' );
          },
          { once: true }
        );
        videoOverlay.classList.add( 'fadein' );

        document.body.classList.add( 'modal-active' );

        if ( requestedVideoID === player.getVideoEmbedCode() ) {
          player.playVideo();
        } else {
          player.loadVideoById( {
            videoId: requestedVideoID,
            startSeconds: startTime || null,
            endSeconds: endTime || null,
          } );
        }
        player.setVolume( 50 );
      }
    } );

    closeVideoOverlay.addEventListener( 'click', () => {
      let currentVolume = player.getVolume();
      const fadeout = setInterval( () => {
        if ( currentVolume <= 0 ) {
          player.pauseVideo();
          clearInterval( fadeout );
        }
        currentVolume -= 5;
        player.setVolume( currentVolume );
      }, 100 );

      videoOverlay.addEventListener(
        'animationend',
        () => {
          videoOverlay.classList.remove( 'is-open' );
          videoOverlay.classList.remove( 'fadeout' );
        },
        { once: true }
      );
      videoOverlay.classList.add( 'fadeout' );

      document.body.classList.remove( 'modal-active' );
    } );
  };

  const onPlayerStateChange = ( event ) => {
    const videoOverlay = document.getElementById( 'video-overlay' );

    if ( event.data === YT.PlayerState.ENDED ) {
      videoOverlay.addEventListener(
        'animationend',
        () => {
          videoOverlay.classList.remove( 'is-open' );
          videoOverlay.classList.remove( 'fadeout' );
        },
        { once: true }
      );
      videoOverlay.classList.add( 'fadeout' );

      document.body.classList.remove( 'modal-active' );
    }
  };

  const init = () => {
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-youtube-video' );
    if ( modalVideoTriggers.length < 1 ) {
      return;
    }

    window.videoAPIReady.then( () => {
      const { videoid: videoId, startTime, endTime } = modalVideoTriggers[ 0 ].dataset;

      const playerVars = {
        autoplay: 0,
        start: startTime || null,
        end: endTime || null,
        controls: 1,
        enablejsapi: 1,
        wmode: 'opaque',
        origin: window.location.origin,
        rel: 0,
      };

      player = new YT.Player( 'ytvideo', {
        videoId,
        host: 'https://www.youtube.com',
        playerVars,
        events: {
          onReady: initVideoLinks,
          onStateChange: onPlayerStateChange,
        },
      } );
    } );
  };

  return {
    init,
  };
} )();

export default youtubeVideo;
