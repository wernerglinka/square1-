function closeModal() {
  const videoOverlay = document.getElementById( 'video-overlay' );
  // delete the video player instance, stops the sound
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
}

export default closeModal;
