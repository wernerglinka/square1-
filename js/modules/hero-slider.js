const heroSlider = ( () => {
  function HeroSliderObj( element, options = {} ) {
    const defaultOptions = {
      // Add default options if needed
    };

    const slider = {
      element,
      navigation: element.querySelector( '.js-nav' ),
      slides: Array.from( element.querySelectorAll( '.js-slide' ) ),
      autoplay: element.classList.contains( 'is-autoplay' ),
      autoPlayDelay: 5000,
      newSlideIndex: 0,
      oldSlideIndex: 0,
    };

    slider.navigationItems = Array.from( slider.navigation.querySelectorAll( 'li' ) );
    slider.slidesNumber = slider.slides.length;

    const setAutoplay = () => {
      if ( slider.autoplay ) {
        clearInterval( slider.autoPlayId );
        slider.autoPlayId = setInterval( autoplaySlider, slider.autoPlayDelay );
      }
    };

    const autoplaySlider = () => {
      slider.oldSlideIndex = slider.newSlideIndex;
      slider.newSlideIndex = ( slider.newSlideIndex < slider.slidesNumber - 1 ) ? slider.newSlideIndex + 1 : 0;
      updateSlider();
    };

    const updateSlider = () => {
      renderNewSlide();
      updateSliderNavigation();
      setAutoplay();
    };

    const renderNewSlide = () => {
      const oldSlide = slider.slides[ slider.oldSlideIndex ];
      oldSlide.classList.remove( 'is-selected' );
      oldSlide.classList.add( 'is-moving' );
      const newSlide = slider.slides[ slider.newSlideIndex ];
      newSlide.classList.add( 'is-selected' );
      oldSlide.addEventListener( 'transitionend', function handler() {
        oldSlide.removeEventListener( 'transitionend', handler );
        oldSlide.classList.remove( 'is-moving' );
      } );
    };

    const updateSliderNavigation = () => {
      slider.navigationItems[ slider.oldSlideIndex ].classList.remove( 'is-selected' );
      slider.navigationItems[ slider.newSlideIndex ].classList.add( 'is-selected' );
    };

    const init = () => {
      setAutoplay();
      slider.navigation.addEventListener( 'click', ( event ) => {
        if ( event.target.matches( 'div' ) ) {
          return;
        }
        event.preventDefault();
        const selectedSlide = event.target;
        const parentListItem = selectedSlide.closest( 'li' );
        if ( parentListItem && parentListItem.classList.contains( 'is-selected' ) ) {
          return;
        }
        slider.oldSlideIndex = slider.newSlideIndex;
        slider.newSlideIndex = slider.navigationItems.indexOf( parentListItem );
        updateSlider();
      } );

      if ( slider.autoplay ) {
        slider.element.addEventListener( 'mouseenter', () => clearInterval( slider.autoPlayId ) );
        slider.element.addEventListener( 'mouseleave', setAutoplay );
      }
    };

    init();

    return slider;
  }

  const initSliders = () => {
    // get all hero sliders
    const heroSliders = document.querySelectorAll( '.js-hero' );

    // initialize each hero slider
    heroSliders.forEach( ( slider ) => new HeroSliderObj( slider ) );
  };

  return {
    init: initSliders
  };
} )();

export default heroSlider;
