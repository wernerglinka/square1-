// utils/dom.js
export function createElementWithId( tagName, id, className = '' ) {
  const element = document.createElement( tagName );
  element.id = id;
  element.className = className;
  return element;
}

export function fadeInElement( element, fadeInClass, onAnimationEnd = () => { } ) {
  element.addEventListener(
    'animationend',
    () => {
      element.classList.add( fadeInClass );
      element.classList.remove( 'fadein' );
      onAnimationEnd();
    },
    { once: true }
  );
  element.classList.add( 'fadein' );
}

export function attachEventOnce( element, eventType, handler ) {
  const onceHandler = ( ...args ) => {
    handler( ...args );
    element.removeEventListener( eventType, onceHandler );
  };
  element.addEventListener( eventType, onceHandler );
}
