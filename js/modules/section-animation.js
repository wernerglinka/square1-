import debounce from './helpers/debounce.js';

const sectionAnimations = ( () => {
  'use strict';

  function SectionAnimationsObj( section ) {
    const showSection = ( entries, observer ) => {
      entries.forEach( ( entry ) => {
        if ( entry.isIntersecting ) {
          const thisSection = entry.target;
          thisSection.classList.remove( 'is-hidden' );
          observer.unobserve( thisSection );
        }
      } );
    };

    const updateSections = debounce( () => {
      const observer = new IntersectionObserver( showSection );
      observer.observe( section );
    }, 500 );

    const initSection = () => {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const rect = section.getBoundingClientRect();

      if ( rect.top > viewportHeight ) {
        section.classList.add( 'is-hidden' );
      }

      const resizeObserver = new ResizeObserver( updateSections );
      resizeObserver.observe( document.body );
    };

    initSection();

    return {
      section,
    };
  }

  const initSectionAnimations = () => {
    const animatedSections = document.querySelectorAll( '.js-is-animated' );

    animatedSections.forEach( ( section ) => {
      return new SectionAnimationsObj( section );
    } );
  };

  return {
    init: initSectionAnimations,
  };
} )();

export default sectionAnimations;
