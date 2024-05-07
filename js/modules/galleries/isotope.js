/* eslint-disable space-before-function-paren */
/* global Isotope, imagesLoaded */
import loadVendorObject from '../helpers/load-vendor-object';

const isotopeGallery = ( function () {
  function initIsotope( grid ) {
    let isotope;
    loadVendorObject( 'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', 'Isotope' )
      .then( () => {
        new Isotope( grid, {
          itemSelector: '.isotope-grid-item',
          percentPosition: true,
          layoutMode: 'masonry'
        } );

        grid.isotope( { filter: '*' } );

        const galleryContainer = document.querySelector( '.js-isotope-gallery-container' );
        const filterButtonGroup = galleryContainer.querySelector( '.js-isotope-filter' );
        filterButtonGroup.addEventListener( 'click', function ( event ) {
          // Check if the clicked target is a button
          if ( event.target.tagName === 'BUTTON' ) {
            const filterValue = event.target.getAttribute( 'data-filter' );

            // Initialize Isotope with the selected filter value
            grid.isotope( { filter: filterValue } );
          }
        } );
      } )
      .catch( ( error ) => {
        console.error( `Error loading Isotope script: ${ error }` );
      } );
  }

  function initFilterItems( grid ) {
    const galleryContainer = document.querySelector( '.js-isotope-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-isotope-filter button' );
    const filterButtonGroup = galleryContainer.querySelector( '.js-isotope-filter' );

    allFilterItems.forEach( ( filterItem ) => {
      filterItem.addEventListener( 'click', () => {
        allFilterItems.forEach( ( item ) => {
          item.classList.remove( 'active' );
        } );
        filterItem.classList.add( 'active' );
      } );
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
                initFilterItems( galleryContainer );
                initIsotope( galleryContainer );
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
