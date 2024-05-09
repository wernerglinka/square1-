/* eslint-disable space-before-function-paren */
/* global Isotope, imagesLoaded */
/* reference:
      isotope: https://isotope.metafizzy.co/
      imagesLoaded: https://imagesloaded.desandro.com/
*/

import loadVendorObject from '../helpers/load-vendor-object';

const isotopeGallery = ( function () {
  let isotope;

  function initIsotope( grid ) {
    loadVendorObject( 'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', 'Isotope' )
      .then( () => {
        isotope = new Isotope( grid, {
          itemSelector: '.isotope-grid-item',
          percentPosition: true,
          layoutMode: 'masonry'
        } );

        isotope.arrange( { filter: '*' } );
      } )
      .catch( ( error ) => {
        console.error( `Error loading Isotope script: ${ error }` );
      } );
  }

  function initFilterItems( grid ) {
    const galleryContainer = document.querySelector( '.js-isotope-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-isotope-filter button' );
    const filterButtonGroup = galleryContainer.querySelector( '.js-isotope-filter' );

    filterButtonGroup.addEventListener( 'click', function ( event ) {
      // Check if the clicked target is a button
      if ( event.target.tagName === 'BUTTON' ) {
        const filterValue = event.target.getAttribute( 'data-filter' );
        // Filter items with Isotope
        isotope.arrange( { filter: filterValue } );

        allFilterItems.forEach( ( item ) => {
          item.classList.remove( 'active' );
        } );
        event.target.classList.add( 'active' );
      }
    } );
  }

  function init() {
    const galleryContainer = document.querySelector( '.isotope-grid' );
    const observer = new IntersectionObserver( ( entries ) => {
      entries.forEach( ( entry ) => {
        if ( entry.isIntersecting ) {
          // Load imagesLoaded library
          loadVendorObject( 'https://unpkg.com/imagesloaded@5.0.0/imagesloaded.pkgd.min.js', 'imagesLoaded' )
            .then( () => {
              // check if all images have loaded
              const images = galleryContainer.querySelectorAll( 'img' );
              imagesLoaded( images, () => {
                initIsotope( galleryContainer );
                initFilterItems( galleryContainer );
              } );
            } )
            .catch( ( error ) => {
              console.error( `Error loading imagesLoaded script: ${ error }` );
            } );
          observer.unobserve( entry.target );
        }
      } );
    } );
    observer.observe( galleryContainer );
  }

  return { init };
}() );

export default isotopeGallery;
