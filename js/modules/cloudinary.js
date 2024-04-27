const cloudinaryVideo = ( function () {
  const init = function () {
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-cloudinary-video' );
    // if no video trigger links on page return
    if ( modalVideoTriggers.length < 1 ) {
      return;
    }

    const videoOverlay = document.getElementById( 'video-overlay' );
    const closeVideoOverlay = videoOverlay.querySelector( '.close' );

    // delegate click event listeners for modal videos to the document
    document.addEventListener( 'click', ( e ) => {
      if ( e.target.matches( '.js-modal-cloudinary-video, .js-modal-cloudinary-video * ' ) ) {
        const thisTrigger = e.target.closest( '.js-modal-cloudinary-video' );
        const requestedVideoID = thisTrigger.dataset.videoid;

        e.preventDefault();
        e.stopPropagation();

        // fade in the overlay
        videoOverlay.addEventListener(
          'animationend',
          () => {
            videoOverlay.classList.add( 'is-open' );
            videoOverlay.classList.remove( 'fadein' );
          },
          { once: true }
        );
        videoOverlay.classList.add( 'fadein' );

        // prevent scrolling under the overlay
        document.body.classList.add( 'modal-active' );

        const newIFrame = `
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=demo&public_id=${ requestedVideoID }",
            width="640"
            height="360"
            style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowfullscreen
            frameborder="0"
          ></iframe>
        `;
        // insert iframe into the video-container in the overlay
        document.querySelector( '#video-overlay .video-container' ).innerHTML = newIFrame;
      }
    } );

    // the video overlay is outside the content area, thus is permanent for all pages
    // ergo we can attach the event handler directly to the element

    // close video overlay when close link is clicked
    closeVideoOverlay.addEventListener( 'click', () => {
      // delete the iframe to stop the video
      document.querySelector( '#video-overlay .video-container' ).innerHTML = '';

      // fadeout the overlay
      videoOverlay.addEventListener(
        'animationend',
        () => {
          videoOverlay.classList.remove( 'is-open' );
          videoOverlay.classList.remove( 'fadeout' );
        },
        { once: true }
      );
      videoOverlay.classList.add( 'fadeout' );

      // allow scrolling again
      document.body.classList.remove( 'modal-active' );
    } );
  };

  return {
    init,
  };
}() );

export default cloudinaryVideo;
