/* eslint-disable space-before-function-paren */
/* global Isotope */
import loadVendorObject from '../helpers/load-vendor-object';

const isotopeGallery = ( function () {
  function initIsotope() {
    loadVendorObject( 'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', 'Isotope' )
      .then( () => {
        const elem = document.querySelector( '.isotope-grid' );
        const iso = new Isotope( elem, {
          itemSelector: '.isotope-grid-item',
          layoutMode: 'fitRows'
        } );
      } )
      .catch( ( error ) => {
        console.error( `Error loading Isotope script: ${ error }` );
      } );
  }

  function initFilterItems() {
    const galleryContainer = document.querySelector( '.js-isotope-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-isotope-filter button' );

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
    const galleryContainer = document.querySelector( '.isotope-grid' );

    const observer = new IntersectionObserver( ( entries ) => {
      entries.forEach( ( entry ) => {
        if ( entry.isIntersecting ) {
          initIsotope();
          initFilterItems();
          observer.unobserve( entry.target );
        }
      } );
    } );

    observer.observe( galleryContainer );
  }

  return { init };
}() );

export default isotopeGallery;
