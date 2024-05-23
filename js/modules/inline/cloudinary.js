/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global cloudinary */
import loadScript from '../helpers/load-script';
import loadStyles from '../helpers/load-styles';
import { createElementWithId } from '../helpers/dom';

const inlineCloudinaryVideo = ( videoInstance, index, cloudName ) => {
  console.log( 'Inline CloudinaryVideo Init' );

  const videoId = videoInstance.dataset.videoid;
  const containerId = `cloudinary-video-player-${ index }`;
  const playerId = `player-${ index }`;

  // Create the container element for the video player
  const videoTarget = createElementWithId( 'div', containerId );
  videoInstance.appendChild( videoTarget );

  // Load the Cloudinary video player API and styles
  Promise.all( [
    loadScript( 'https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js', 'cloudinary' ),
    loadStyles( 'https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css' )
  ] )
    .then( () => {
      // Create the video tag
      const videoTag = `
        <video
          id="${ playerId }" 
          controls
          autoplay
          class="cld-video-player"
          data-cld-public-id="${ videoId }"
        ></video>
      `;
      videoInstance.querySelector( `#${ containerId }` ).innerHTML = videoTag;

      // Instantiate the Cloudinary video player
      const player = cloudinary.videoPlayer( playerId, {
        cloudName,
        playedEventPercents: [ 100 ]
      } );

      // clicking on the thumbnail will fadeout the thumbnail and start the video
      videoInstance.parentNode.querySelector( '.video-trigger' ).addEventListener( 'click', ( e ) => {
        player.play();
        videoInstance.parentNode.classList.add( 'video-playing' );
      } );

      // Add event listener for end of playback
      player.on( 'percentsplayed', ( event ) => {
        videoInstance.parentNode.classList.remove( 'video-playing' );
      } );

      // Add event listener for closing the video
      videoInstance.querySelector( '.close' ).addEventListener( 'click', () => {
        player.pause();
        videoInstance.parentNode.classList.remove( 'video-playing' );
      } );
    } )
    .catch( ( error ) => {
      console.error( `Error loading script: ${ error }` );
    } );
};

export default inlineCloudinaryVideo;
