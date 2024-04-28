/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
const inlineVideos = ( function () {
  // allVideos is initially a placeholder div and will be replaced with the
  // actual video element when the video is loaded
  const allVideos = document.querySelectorAll( '.js-inline-video' );
  const allVideoWrappers = document.querySelectorAll( '.js-inline-video-wrapper' );
  const allPlayers = [];

  // initialize all video trigger links when the player is ready
  const initVideoLinks = function () {
    allVideoWrappers.forEach( function ( thisTrigger, i ) {
      // find the trigger in the video wrapper
      thisTrigger.nextElementSibling.addEventListener( 'click', ( e ) => {
        // ...fadeout the thumbnail
        e.target.parentNode.parentNode.classList.add( 'video-playing' );
      } );
    } );
  };

  const init = function () {
    // add unique id to each video trigger
    allVideos.forEach( function ( thisVideo, thisVideoIndex ) {
      thisVideo.id = `inline-video-${ thisVideoIndex }`;
    } );

    // initialize all inline video players on a page
    allVideos.forEach( ( thisVideo, i ) => {
      const videoID = thisVideo.dataset.videoid;

      // get the src string attribute for the video source
      let url;
      switch ( thisVideo.dataset.videosrc ) {
        case 'youtube':
          url = `https://www.youtube.com/embed/${ videoID }`;
          break;
        case 'vimeo':
          url = `https://player.vimeo.com/video/${ videoID }`;
          break;
        case 'cloudinary':
          url = `https://player.cloudinary.com/embed/?cloud_name=demo&public_id=${ videoID }`;
          break;
        default:
          url = '';
          break;
      }

      // insert the iframe into the video container
      const newIFrame = `
          <iframe
            src=${ url }
            width="640"
            height="360"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameborder="0"
            allowfullscreen></iframe>
        `;
      // insert iframe into the video-container in the overlay
      thisVideo.insertAdjacentHTML( 'beforeend', newIFrame );
    } );

    initVideoLinks();
  };

  return {
    init,
  };
}() );

export default inlineVideos;
