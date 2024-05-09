/* eslint-disable space-before-function-paren */
/* global Swiper, imagesLoaded */
/* reference:
      swiper: https://swiperjs.com/
      imagesLoaded: https://imagesloaded.desandro.com/
*/

import loadStyles from './helpers/load-styles';
import loadVendorObject from './helpers/load-vendor-object';

const imageSlider = ( function () {
  function initSwiper() {
    loadStyles( 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css' );
    loadVendorObject( 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', 'Swiper' )
      .then( () => {
        const swiper = new Swiper( '.swiper', {
          // Optional parameters
          direction: 'horizontal',
          loop: true,
          autoplay: {
            delay: 2000,
            pauseOnMouseEnter: true,
          },

          // If we need pagination
          pagination: {
            el: '.swiper-pagination',
          },

          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        } );
      } )
      .catch( ( error ) => {
        console.error( `Error loading Isotope script: ${ error }` );
      } );
  }

  function init() {
    const imageSliderContainer = document.querySelector( '.js-image-slider' );
    const observer = new IntersectionObserver( ( entries ) => {
      entries.forEach( ( entry ) => {
        if ( entry.isIntersecting ) {
          // Load imagesLoaded library
          loadVendorObject( 'https://unpkg.com/imagesloaded@5.0.0/imagesloaded.pkgd.min.js', 'imagesLoaded' )
            .then( () => {
              // check if all images have loaded
              const images = imageSliderContainer.querySelectorAll( 'img' );
              imagesLoaded( images, () => {
                initSwiper();
              } );
            } )
            .catch( ( error ) => {
              console.error( `Error loading imagesLoaded script: ${ error }` );
            } );
          observer.unobserve( entry.target );
        }
      } );
    } );
    observer.observe( imageSliderContainer );
  }

  return { init };
}() );

export default imageSlider;
