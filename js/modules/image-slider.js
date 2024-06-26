/* eslint-disable space-before-function-paren */
/* global Swiper, imagesLoaded */
/* reference:
  swiper: https://swiperjs.com/
  imagesLoaded: https://imagesloaded.desandro.com/
*/
import loadStyles from './helpers/load-styles';
import loadVendorObject from './helpers/load-vendor-object';

const imageSlider = ( () => {
  function ImageSliderObj( element, options ) {
    const defaults = {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    };

    const settings = { ...defaults, ...options };

    const initSwiper = () => {
      loadStyles( 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css' );
      loadVendorObject( 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', 'Swiper' )
        .then( () => {
          const swiper = new Swiper( element, settings );
        } )
        .catch( ( error ) => {
          console.error( `Error loading Isotope script: ${ error }` );
        } );
    };

    const initModule = () => {
      const observer = new IntersectionObserver( ( entries ) => {
        entries.forEach( ( entry ) => {
          if ( entry.isIntersecting ) {
            // Load imagesLoaded library
            loadVendorObject( 'https://unpkg.com/imagesloaded@5.0.0/imagesloaded.pkgd.min.js', 'imagesLoaded' )
              .then( () => {
                // check if all images have loaded
                const images = element.querySelectorAll( 'img' );
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

      observer.observe( element );
    };

    initModule();

    return {
      element,
      settings,
    };
  }

  const initImageSlider = () => {
    const elements = document.querySelectorAll( '.js-image-slider' );

    elements.forEach( ( element ) => {
      // future use for options
      const options = {
        // Parse options from data attributes or other sources
      };

      return new ImageSliderObj( element, options );
    } );
  };

  return {
    init: initImageSlider,
  };
} )();

export default imageSlider;
