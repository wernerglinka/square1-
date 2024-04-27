import debounce from './debounce.js';

const sectionAnimations = ( () => {
  'use strict';

  // Function to show section when it's in the viewport
  const showSection = ( entries, observer ) => {
    // During initial page load the entries array contains all watched objects. The
    // isIntersecting property for the individual object indicates visibility.
    entries.forEach( ( entry ) => {
      if ( entry.isIntersecting ) {
        const thisSection = entry.target;
        // re move class to trigger animation and
        // take this section off the observe list
        thisSection.classList.remove( 'is-hidden' );
        observer.unobserve( thisSection );
      }
    } );
  };

  // Function to update sections on resize
  const updateSections = debounce( () => {
    const observer = new IntersectionObserver( showSection );
    const allSections = document.querySelectorAll( '.js-is-animated' );
    allSections.forEach( ( section ) => observer.observe( section ) );
  }, 500 );

  // Initialize the module
  const init = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const allSections = document.querySelectorAll( '.js-is-animated' );

    // Add 'is-hidden' class to sections that are below the viewport
    allSections.forEach( ( section ) => {
      const rect = section.getBoundingClientRect();
      if ( rect.top > viewportHeight ) {
        section.classList.add( 'is-hidden' );
      }
    } );

    // Observe for resize events
    const resizeObserver = new ResizeObserver( updateSections );
    resizeObserver.observe( document.body );
  };

  return {
    init,
  };
} )();

export default sectionAnimations;
