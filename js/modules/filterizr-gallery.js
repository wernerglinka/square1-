/* eslint-disable space-before-function-paren */
/* global filterizr_script Filterizr */

import loadScript from './helpers/load-script';
import loadVendorObject from './helpers/load-vendor-object';
loadVendorObject( filterizr_script.src, 'Filterizr' );

const filterizrGallery = ( function () {
  function init() {
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

              console.log( 'init' );
            }
          }
        };

        // looks like we need to wait a bit otherwise the rendered images are not
        // consistently displayed correctly
        setTimeout( () => {
          const filterizr = new Filterizr( '.filtr-container', options );
        }, 100 );
      } )

      .catch( ( error ) => {
        console.error( `Error loading script: ${ error }` );
      } );

    const galleryContainer = document.querySelector( '.js-filterizr-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-filterizr button' );

    allFilterItems.forEach( ( filterItem ) => {
      filterItem.addEventListener( 'click', ( e ) => {
        allFilterItems.forEach( ( item ) => {
          item.classList.remove( 'active' );
        } );
        filterItem.classList.add( 'active' );
      } );
    } );
  }

  return { init };
}() );
export default filterizrGallery;
