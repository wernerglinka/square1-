const imagesGallery = ( function () {
  'use strict';

  const init = () => {
    if ( !document.querySelector( '.js-images-gallery-container' ) ) {
      return;
    }

    const galleryContainer = document.querySelector( '.js-images-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-filter button' );
    const allImages = galleryContainer.querySelector( '.js-images-gallery' );

    allFilterItems.forEach( ( filterItem ) => {
      filterItem.addEventListener( 'click', ( e ) => {
        const filterValue = filterItem.getAttribute( 'filter-item' );
        const galleryItems = allImages.querySelectorAll( '.js-image' );

        allFilterItems.forEach( ( item ) => {
          item.classList.remove( 'active' );
        } );
        filterItem.classList.add( 'active' );

        allImages.classList.add( 'fade-out' );

        allImages.addEventListener( 'transitionend', () => {
          galleryItems.forEach( ( galleryItem ) => {
            const galleryItemTerms = galleryItem.getAttribute( 'filter-item' );

            if ( galleryItemTerms.includes( filterValue ) || filterValue === 'all' ) {
              galleryItem.classList.remove( 'hidden' );
            } else {
              galleryItem.classList.add( 'hidden' );
            }
          } );

          allImages.classList.remove( 'fade-out' );
        }, { once: true } );
      } );
    } );
  };

  return { init };
}() );

export default imagesGallery;
