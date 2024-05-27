const imageComparison = ( () => {
  function ImageComparisonObj( element, options ) {
    const defaults = {
      // Default options
    };

    const settings = { ...defaults, ...options };

    let dragging = false;
    let resizing = false;

    const initModule = () => {
      // Check if the .image-comparison-container is in the viewport
      // If yes, animate it
      const intersectionObserver = new IntersectionObserver( ( entries, observer ) => {
        entries.forEach( ( entry ) => {
          if ( entry.isIntersecting ) {
            element.classList.add( 'is-visible' );
            // remove element from observer list
            observer.unobserve( entry.target );
          }
        } );
      } );
      // Start observing the target element
      intersectionObserver.observe( element );

      // Make the .comparison-handle element draggable and modify .resize-img width according to its position
      const dragElement = element.querySelector( '.comparison-handle' );
      const resizeElement = element.querySelector( '.resize-img' );
      const labelContainer = element.querySelector( '.image-title[data-type="before"]' );
      const labelResizeElement = element.querySelector( '.image-title[data-type="after"]' );

      drags( dragElement, resizeElement, element, labelContainer, labelResizeElement );

      // Create a new ResizeObserver instance
      const resizeObserver = new ResizeObserver( () => {
        if ( !resizing ) {
          resizing = true;
          checkLabel( element );
        }
      } );
      // Start observing the target element
      resizeObserver.observe( element );
    };

    function checkLabel( container ) {
      updateLabel( container.querySelector( '.image-title[data-type="modified"]' ), container.querySelector( '.resize-img' ), 'left' );
      updateLabel( container.querySelector( '.image-title[data-type="original"]' ), container.querySelector( '.resize-img' ), 'right' );

      resizing = false;
    }

    // Draggable functionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags( dragElement, resizeElement, container, labelContainer, labelResizeElement ) {
      dragElement.addEventListener( 'mousedown', function ( e ) {
        dragElement.classList.add( 'draggable' );
        resizeElement.classList.add( 'resizable' );

        const dragWidth = dragElement.offsetWidth,
          xPosition = dragElement.offsetLeft + dragWidth - e.pageX,
          containerOffset = container.offsetLeft,
          containerWidth = container.offsetWidth,
          minLeft = containerOffset + 10,
          maxLeft = containerOffset + containerWidth - dragWidth - 10;

        document.addEventListener( 'mousemove', handleMouseMove );
        document.addEventListener( 'mouseup', handleMouseUp );

        e.preventDefault();

        function handleMouseMove( e ) {
          if ( !dragging ) {
            dragging = true;
            if ( !window.requestAnimationFrame ) {
              setTimeout( function () {
                animateDraggedHandle( e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement, dragElement );
              }, 100 );
            } else {
              requestAnimationFrame( function () {
                animateDraggedHandle( e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement, dragElement );
              } );
            }
          }
        }

        function handleMouseUp() {
          dragElement.classList.remove( 'draggable' );
          resizeElement.classList.remove( 'resizable' );
          document.removeEventListener( 'mousemove', handleMouseMove );
          document.removeEventListener( 'mouseup', handleMouseUp );
        }
      } );
    }

    function animateDraggedHandle( e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement, dragElement ) {
      const cursorX = e.pageX - containerOffset;
      let widthValue = ( cursorX / containerWidth ) * 100;

      // Constrain the draggable element to move inside its container
      if ( widthValue < ( minLeft - containerOffset ) / containerWidth * 100 ) {
        widthValue = ( minLeft - containerOffset ) / containerWidth * 100;
      } else if ( widthValue > ( maxLeft - containerOffset ) / containerWidth * 100 ) {
        widthValue = ( maxLeft - containerOffset ) / containerWidth * 100;
      }

      dragElement.style.left = widthValue + '%';
      resizeElement.style.width = widthValue + '%';

      updateLabel( labelResizeElement, resizeElement, 'left' );
      updateLabel( labelContainer, resizeElement, 'right' );

      dragging = false;
    }

    function updateLabel( label, resizeElement, position ) {
      if ( label && resizeElement ) {
        if ( position === 'left' ) {
          if ( label.offsetLeft + label.offsetWidth < resizeElement.offsetLeft + resizeElement.offsetWidth ) {
            label.classList.remove( 'is-hidden' );
          } else {
            label.classList.add( 'is-hidden' );
          }
        } else if ( label.offsetLeft > resizeElement.offsetLeft + resizeElement.offsetWidth ) {
          label.classList.remove( 'is-hidden' );
        } else {
          label.classList.add( 'is-hidden' );
        }
      }
    }

    initModule();

    return {
      element,
      settings,
    };
  }

  const initImageComparison = () => {
    const elements = document.querySelectorAll( '.image-comparison-container' );
    elements.forEach( ( element ) => {
      const options = {
        // Parse options from data attributes or other sources
      };
      return new ImageComparisonObj( element, options );
    } );
  };

  return {
    init: initImageComparison,
  };
} )();

export default imageComparison;
