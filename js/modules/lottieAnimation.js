import debounce from './helpers/debounce';

const lottieAnimations = ( () => {
  function LottieAnimationObj( lottie, options ) {
    const defaults = {
      threshold: 1.0,
    };

    const settings = { ...defaults, ...options };

    const playLottie = ( entries, observer ) => {
      for ( const entry of entries ) {
        if ( entry.isIntersecting ) {
          setTimeout( () => {
            element.play();
            observer.unobserve( element );
          }, 500 );
        }
      }
    };

    const watchLottie = debounce( () => {
      const observer = new IntersectionObserver( playLottie );
      observer.observe( element );
    }, 500 );

    const resizeObserver = new ResizeObserver( watchLottie );
    resizeObserver.observe( document.body );

    return {
      lottie,
      settings,
    };
  }

  const initLottieAnimations = () => {
    const allLotties = document.querySelectorAll( '.js-lottie' );

    allLotties.forEach( ( lottie ) => {
      const options = {
        // Parse options from data attributes or other sources
      };

      return new LottieAnimationObj( lottie, options );
    } );
  };

  return {
    init: initLottieAnimations,
  };
} )();

export default lottieAnimations;
