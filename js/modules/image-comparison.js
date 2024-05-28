const imageComparison = ( () => {
  function ImageComparisonObj( element, options ) {
    const defaults = {
      // Default options
    };

    const settings = { ...defaults, ...options };

    let dragging = false;
    let resizing = false;

    const initModule = () => {
      // Animate image comparison container when in viewport
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

      // Drag the comparison handle and modify the after image width according to its position
      const dragHandle = element.querySelector( '.comparison-handle' );
      const afterImage = element.querySelector( '.after-image' );
      const labelContainer = element.querySelector( '.image-status.before' );
      const labelAfterImage = element.querySelector( '.image-status.after' );

      drags( dragHandle, afterImage, element, labelContainer, labelAfterImage );

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
      updateLabel( container.querySelector( '.image-status[data-type="modified"]' ), container.querySelector( '.after-image' ), 'left' );
      updateLabel( container.querySelector( '.image-status[data-type="original"]' ), container.querySelector( '.after-image' ), 'right' );

      resizing = false;
    }

    function drags( dragHandle, afterImage, container, labelContainer, labelAfterImage ) {
      dragHandle.addEventListener( 'mousedown', function( e ) {
        dragHandle.classList.add( 'is-dragged' );
        afterImage.classList.add( 'resizable' );

        // get container properties
        const containerOffset = container.offsetLeft;
        const containerWidth = container.offsetWidth;

        // get the drag handle properties
        const dragHandleWidth = dragHandle.offsetWidth;
        const dragHandleCenter = dragHandle.offsetLeft + ( dragHandleWidth / 2 );
        // offset between the drag handle center and the clicked cursor position inside the
        // drag handle. This is a number between - (dragHandleWidth / 2) and + (dragHandleWidth / 2)
        const cursorToDragHandleCenterOffset = dragHandleCenter - ( e.pageX - containerOffset );

        // divide between before and after is at half the handle width
        // left edge of the handle extends by half its width over the left edge of the container
        const minDragHandlePosition = -dragHandleWidth / 2;
        // right edge of the handle extends by half its width over the right edge of the container
        const maxDragHandlePosition = containerWidth - ( dragHandleWidth / 2 );

        document.addEventListener( 'mousemove', handleMouseMove );
        document.addEventListener( 'mouseup', handleMouseUp );

        e.preventDefault();

        function handleMouseMove( e ) {
          if ( !dragging ) {
            dragging = true;
            if ( !window.requestAnimationFrame ) {
              setTimeout( function() {
                animateDraggedHandle( e, dragHandleWidth, cursorToDragHandleCenterOffset, minDragHandlePosition, maxDragHandlePosition, containerOffset, afterImage, labelContainer, labelAfterImage, dragHandle );
              }, 100 );
            } else {
              requestAnimationFrame( function() {
                animateDraggedHandle( e, dragHandleWidth, cursorToDragHandleCenterOffset, minDragHandlePosition, maxDragHandlePosition, containerOffset, afterImage, labelContainer, labelAfterImage, dragHandle );
              } );
            }
          }
        }

        function handleMouseUp() {
          dragHandle.classList.remove( 'is-dragged' );
          afterImage.classList.remove( 'resizable' );
          document.removeEventListener( 'mousemove', handleMouseMove );
          document.removeEventListener( 'mouseup', handleMouseUp );
        }
      } );
    }

    function animateDraggedHandle( e, dragHandleWidth, cursorToDragHandleCenterOffset, minDragHandlePosition, maxDragHandlePosition, containerOffset, afterImage, labelContainer, labelAfterImage, dragHandle ) {
      const cursorPositionX = e.pageX;
      const dragHandlePosition = cursorPositionX - containerOffset - ( dragHandleWidth / 2 ) + cursorToDragHandleCenterOffset;

      // update the handle position and after image width
      if ( dragHandlePosition < minDragHandlePosition ) {
        dragHandle.style.left = minDragHandlePosition + 'px';
        afterImage.style.width = minDragHandlePosition + ( dragHandleWidth / 2 ) + 'px';
      } else if ( dragHandlePosition > maxDragHandlePosition ) {
        dragHandle.style.left = maxDragHandlePosition + 'px';
        afterImage.style.width = maxDragHandlePosition + ( dragHandleWidth / 2 ) + 'px';
      } else {
        dragHandle.style.left = dragHandlePosition + 'px';
        afterImage.style.width = dragHandlePosition + ( dragHandleWidth / 2 ) + 'px';
      }

      updateLabel( labelAfterImage, afterImage, 'left' );
      updateLabel( labelContainer, afterImage, 'right' );

      dragging = false;
    }

    function updateLabel( label, afterImage, position ) {
      if ( label && afterImage ) {
        if ( position === 'left' ) {
          if ( label.offsetLeft + label.offsetWidth < afterImage.offsetLeft + afterImage.offsetWidth ) {
            label.classList.remove( 'is-hidden' );
          } else {
            label.classList.add( 'is-hidden' );
          }
        } else if ( label.offsetLeft > afterImage.offsetLeft + afterImage.offsetWidth ) {
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
