/* eslint-disable space-unary-ops */
const imagesGallery = ( function () {
  'use strict';

  const init = () => {
    const galleryContainer = document.querySelector( '.js-images-gallery-container' );
    if ( !galleryContainer ) {
      return;
    }

    const allFilterItems = galleryContainer.querySelectorAll( '.js-filter button' );
    const allImages = galleryContainer.querySelector( '.js-images-gallery' );
    const galleryItems = allImages.querySelectorAll( '.js-image' );

    const filterImages = ( filterValue ) => {
      allImages.classList.add( 'fade-out' );
      allImages.addEventListener( 'transitionend', () => {
        galleryItems.forEach( ( galleryItem ) => {
          const galleryItemTerms = galleryItem.getAttribute( 'filter-item' );
          galleryItem.classList.toggle( 'hidden', !galleryItemTerms.includes( filterValue ) && filterValue !== 'all' );
        } );
        allImages.classList.remove( 'fade-out' );
      }, { once: true } );
    };

    allFilterItems.forEach( ( filterItem ) => {
      filterItem.addEventListener( 'click', () => {
        const filterValue = filterItem.getAttribute( 'filter-item' );
        allFilterItems.forEach( ( item ) => item.classList.remove( 'active' ) );
        filterItem.classList.add( 'active' );
        filterImages( filterValue );
      } );
    } );
  };

  return { init };
}() );

export default imagesGallery;
