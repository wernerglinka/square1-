/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import inlineCloudinaryVideo from './inline/cloudinary';
import inlineYoutubeVideo from './inline/youtube';
import inlineVimeoVideo from './inline/vimeo';

const inlineVideos = ( () => {
  const videoProviderMap = {
    cloudinary: inlineCloudinaryVideo,
    youtube: inlineYoutubeVideo,
    vimeo: inlineVimeoVideo,
  };

  const initVideoPlayer = ( videoInstance, index ) => {
    const providerId = videoInstance.dataset.videosrc;
    const cloudName = videoInstance.dataset.cloudname;
    const videoProvider = videoProviderMap[ providerId ];

    if ( videoProvider ) {
      videoProvider( videoInstance, index, cloudName );
    } else {
      console.warn( `Unsupported video provider: ${ providerId }` );
    }
  };

  const init = () => {
    console.log( 'Inline Videos Init' );

    const allVideos = document.querySelectorAll( '.js-inline-video' );
    allVideos.forEach( ( video, index ) => {
      video.id = `inline-video-${ index }`;
      initVideoPlayer( video, index );
    } );
  };

  return {
    init,
  };
} )();

export default inlineVideos;
