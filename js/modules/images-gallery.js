const imagesGallery = ( function () {
  'use strict';

  const init = () => {
    if ( !document.querySelector( '.js-images-gallery-container' ) ) {
      return;
    }

    const galleryContainer = document.querySelector( '.js-images-gallery-container' );
    const allFilterItems = galleryContainer.querySelectorAll( '.js-filter a' );
    const allImages = galleryContainer.querySelector( '.images-gallery' );

    allFilterItems.forEach( ( filterItem ) => {
      filterItem.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        const filterValue = filterItem.getAttribute( 'data-filter' );
        const galleryItems = allImages.querySelectorAll( '.image' );

        allFilterItems.forEach( ( item ) => {
          item.classList.remove( 'active' );
        } );
        filterItem.classList.add( 'active' );

        allImages.classList.add( 'fade-out' );

        allImages.addEventListener( 'transitionend', () => {
          galleryItems.forEach( ( galleryItem ) => {
            const galleryItemTerms = galleryItem.getAttribute( 'filter-term' );

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
