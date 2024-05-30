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

    const initModule = ( instance ) => {
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

      initControls( instance );

      if ( spinContinuously === 'true' ) {
        spin( instance );
      }
    };

    const spin = ( instance ) => {
      let i = Number( instance.dataset.startingFrame );
      const timeoutPeriod = Number( instance.dataset.timeout );
      let start;

      const loop = ( timestamp ) => {
        if ( !start ) {
          start = timestamp;
        }
        const progress = timestamp - start;

        if ( progress > timeoutPeriod ) {
          i = updateFrameNumber( instance );
          goToNewFrame( i, instance );

          if ( instance.dataset.spinContinuously !== 'true' ) {
            instance.dataset.startingFrame = String( i );
            return;
          }

          start = timestamp;
        }

        requestAnimationFrame( loop );
      };

      requestAnimationFrame( loop );
    };

    const goToNewFrame = ( i, instance, slider ) => {
      const numberOfFrames = parseInt( instance.dataset.numberFrames );
      const frameWidth = 100 / ( numberOfFrames - 1 );

      instance.style.backgroundPosition = `${ i * frameWidth }% 0px`;
      instance.dataset.currentFrame = String( i );

      if ( slider ) {
        slider.value = i; // update slider value
      }
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
      // double click will toggle the continuous spinning
      instance.addEventListener( 'dblclick', ( e ) => {
        instance.dataset.spinContinuously =
          instance.dataset.spinContinuously === 'true' ? 'false' : 'true';
        if ( instance.dataset.spinContinuously === 'true' ) {
          spin( instance );
        }
      } );

      // create start/stop button
      const startStopButton = document.createElement( 'button' );
      startStopButton.textContent = 'Start/Stop';
      startStopButton.addEventListener( 'click', () => {
        instance.dataset.spinContinuously =
          instance.dataset.spinContinuously === 'true' ? 'false' : 'true';
        if ( instance.dataset.spinContinuously === 'true' ) {
          spin( instance, slider );
        }
      } );
      instance.parentNode.insertBefore( startStopButton, instance.nextSibling );

      // create slider
      const slider = document.createElement( 'input' );
      slider.type = 'range';
      slider.min = 0;
      slider.max = instance.dataset.numberFrames - 1;
      slider.value = 0;
      slider.addEventListener( 'input', () => {
        const i = parseInt( slider.value );
        goToNewFrame( i, instance, slider );
      } );
      instance.parentNode.insertBefore( slider, startStopButton.nextSibling );

      // move instance manually by dragging the cursor
      let startPointerPosX;
      let isPointerDown = false;

      const handlePointerDown = ( e ) => {
        e.preventDefault();
        isPointerDown = true;
        startPointerPosX = e.clientX || e.touches[ 0 ].clientX;
      };

      const handlePointerMove = ( e ) => {
        if ( !isPointerDown ) {
          return;
        }

        const currentPointerPosX = e.clientX || e.touches[ 0 ].clientX;
        const moveTo = currentPointerPosX - startPointerPosX;

        if ( Math.abs( moveTo ) > settings.dragThreshold ) {
          startPointerPosX = currentPointerPosX;
          instance.dataset.spinDirection = moveTo >= 1 ? 'backward' : 'forward';
          const i = updateFrameNumber( instance );
          goToNewFrame( i, instance, slider );
        }
      };

      const handlePointerUp = () => {
        isPointerDown = false;
        startPointerPosX = null;
      };

      instance.addEventListener( 'mousedown', handlePointerDown );
      instance.addEventListener( 'touchstart', handlePointerDown );

      instance.addEventListener( 'mousemove', handlePointerMove );
      instance.addEventListener( 'touchmove', handlePointerMove );

      window.addEventListener( 'mouseup', handlePointerUp );
      window.addEventListener( 'touchend', handlePointerUp );
    };

    initModule( element );

    return {
      element,
      settings,
    };
  }

  const initSpinSandBox = () => {
    const elements = document.querySelectorAll( '.js-image-spin' );
    elements.forEach( ( element, index ) => {
      const options = {
        // Parse options from data attributes or other sources
      };
      new SpinSandBoxModule( element, options );
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
