const spinSandBox = ( () => {
  function SpinSandBoxModule( element, options ) {
    const defaults = {
      defaultSpinContinously: false,
      defaultNumberOfFrames: 36,
      defaultStartingFrame: 0,
      defaultSpinDirection: 'forward',
      defaultTimeout: 120,
      dragThreshold: 8,
    };

    const settings = { ...defaults, ...options };
    const hasTouch = 'ontouchstart' in window;

    const initModule = () => {
      const imageSpinContainers = document.querySelectorAll( '.imageSpinContainer' );
      imageSpinContainers.forEach( ( instance ) => {
        const {
          startingFrame = settings.defaultStartingFrame,
          currentFrame = startingFrame,
          spinContinuously = settings.defaultSpinContinously,
          spinDirection = settings.defaultSpinDirection,
          numberFrames = settings.defaultNumberOfFrames,
          timeout = settings.defaultTimeout,
        } = instance.dataset;

        Object.assign( instance.dataset, {
          startingFrame,
          currentFrame,
          spinContinuously,
          spinDirection,
          numberFrames,
          timeout,
          swipeDistance: 0,
        } );

        goToNewFrame( startingFrame, instance );
        instance.style.fadeIn = 'slow';

        initControls( instance );

        if ( spinContinuously ) {
          spin( instance );
        }
      } );
    };

    const spin = ( instance ) => {
      let i = parseInt( instance.dataset.startingFrame );
      const timeoutPeriod = parseInt( instance.dataset.timeout );
      let start;

      function loop( timestamp ) {
        if ( !start ) {
          start = timestamp;
        }
        const progress = timestamp - start;

        if ( progress > timeoutPeriod ) {
          i = updateFrameNumber( instance );
          goToNewFrame( i, instance );

          if ( instance.dataset.spinContinuously === 'true' ) {
            start = timestamp;
            requestAnimationFrame( loop );
          } else {
            instance.dataset.startingFrame = String( i );
          }
        } else {
          requestAnimationFrame( loop );
        }
      }

      requestAnimationFrame( loop );
    };

    const goToNewFrame = ( i, instance ) => {
      const numberOfFrames = parseInt( instance.dataset.numberFrames );
      const frameWidth = 100 / ( numberOfFrames - 1 );

      instance.style.backgroundPosition = `${ i * frameWidth }% 0px`;
      instance.dataset.currentFrame = String( i );
    };

    const updateFrameNumber = ( instance ) => {
      const spinDirection = instance.dataset.spinDirection;
      let i = parseInt( instance.dataset.currentFrame );
      const numberOfFrames = parseInt( instance.dataset.numberFrames );

      if ( spinDirection === 'forward' ) {
        i = ( i + 1 ) % numberOfFrames;
      } else {
        i = ( i - 1 + numberOfFrames ) % numberOfFrames;
      }
      return i;
    };

    const initControls = ( instance ) => {
      instance.addEventListener( 'dblclick', () => {
        instance.dataset.spinContinuously = instance.dataset.spinContinuously === 'true' ? 'false' : 'true';
        if ( instance.dataset.spinContinuously === 'true' ) {
          spin( instance );
        }
      } );

      if ( hasTouch ) {
        let StartMousePosX;

        instance.addEventListener( 'touchstart', ( e ) => {
          e.preventDefault();
          StartMousePosX = e.touches[ 0 ].clientX;
        } );

        instance.addEventListener( 'touchmove', ( e ) => {
          const currentMousePosX = e.touches[ 0 ].clientX;
          const moveTo = parseInt( ( currentMousePosX - StartMousePosX ), 10 );

          if ( Math.abs( moveTo ) > settings.dragThreshold ) {
            StartMousePosX = currentMousePosX;

            instance.dataset.spinDirection = moveTo >= 1 ? 'backward' : 'forward';
            const i = updateFrameNumber( instance );
            goToNewFrame( i, instance );
          }
        } );

        window.addEventListener( 'touchend', () => {
          StartMousePosX = null;
        } );
      }
    };

    initModule();

    return {
      element,
      settings,
    };
  }

  const initSpinSandBox = () => {
    const elements = document.querySelectorAll( '.js-image-spin' );
    elements.forEach( ( element ) => {
      const options = {
        // Parse options from data attributes or other sources
      };
      return new SpinSandBoxModule( element, options );
    } );
  };

  window.addEventListener( 'load', () => {
    const imageSpinContainers = document.querySelectorAll( '.imageSpinContainer' );
    imageSpinContainers.forEach( ( container ) => {
      // swap the background image url with the data-image-sprite url
      container.style.backgroundImage = `url(${ container.dataset.imageSprite })`;
    } );
  } );

  return {
    init: initSpinSandBox,
  };
} )();

export default spinSandBox;
