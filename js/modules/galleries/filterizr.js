/* eslint-disable space-before-function-paren */
/* global filterizr_script Filterizr */
import loadVendorObject from '../helpers/load-vendor-object';

const filterizrGallery = ( function () {
  function initFilterizr() {
    loadVendorObject( filterizr_script.src, 'Filterizr' )
      .then( () => {
        // Configure your options
        const options = {
          layout: 'sameWidth',
          callbacks: {
            onInit() {
              // get the height of the gallery container and set it as a fixed height
              const galleryContainer = document.querySelector( '.js-filterizr-gallery-container' );
              const galleryContainerHeight = galleryContainer.offsetHeight;
              galleryContainer.style.height = `${ galleryContainerHeight }px`;
              galleryContainer.classList.add( 'loaded' );
            }
          }
        };

        new Filterizr( '.filtr-container', options );
      } )
      .catch( ( error ) => {
        console.error( `Error loading script: ${ error }` );
      } );
  }

  function initFilterItems() {
    const galleryContainer = document.querySelector( '.js-filterizr-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-filterizr-filter button' );

    allFilterItems.forEach( ( filterItem ) => {
      filterItem.addEventListener( 'click', ( e ) => {
        allFilterItems.forEach( ( item ) => {
          item.classList.remove( 'active' );
        } );
        filterItem.classList.add( 'active' );
      } );
    } );
  }

  function init() {
    const galleryContainer = document.querySelector( '.filtr-container' );

    const observer = new IntersectionObserver( ( entries ) => {
      entries.forEach( ( entry ) => {
        if ( entry.isIntersecting ) {
          initFilterizr();
          initFilterItems();
          observer.unobserve( entry.target );
        }
      } );
    } );

    observer.observe( galleryContainer );
  }

  return { init };
}() );

export default filterizrGallery;
