const mobileFlipCardSupport = ( function ( $ ) {
  function FlipcardObj( flipcard, options ) {
    const defaults = {
      // Default options
    };

    const settings = { ...defaults, ...options };

    flipcard.addEventListener( 'touchstart', function () {
      flipcard.classList.toggle( 'flip' );
    } );

    flipcard.addEventListener( 'mouseenter', function () {
      flipcard.classList.add( 'flip' );
    } );

    flipcard.addEventListener( 'mouseleave', function () {
      flipcard.classList.remove( 'flip' );
    } );

    return {
      flipcard,
      settings,
    };
  }

  const initFlipcards = () => {
    const flipcards = document.querySelectorAll( '.flip-card-wrapper' );

    flipcards.forEach( ( flipcard ) => {
      return new FlipcardObj( flipcard );
    } );
  };
  return {
    init: initFlipcards,
  };
}() );

export default mobileFlipCardSupport;
