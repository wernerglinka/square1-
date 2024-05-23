const heroSlider = ( () => {
  function HeroSliderObj( element ) {
    const slider = {
      element,
      navigation: element.querySelector( '.js-nav' ),
      marker: element.querySelector( '.js-nav .js-marker' ),
      slides: Array.from( element.querySelectorAll( '.js-slide' ) ),
      autoplay: element.classList.contains( 'is-autoplay' ),
      autoPlayId: null,
      autoPlayDelay: 5000,
      newSlideIndex: 0,
      oldSlideIndex: 0,
    };

    slider.navigationItems = Array.from( slider.navigation.querySelectorAll( 'li' ) );
    slider.slidesNumber = slider.slides.length;

    const uploadVideo = () => {
      const videoSlides = Array.from( slider.element.getElementsByClassName( 'js-cd-bg-video' ) );
      videoSlides.forEach( ( videoSlide ) => {
        if ( videoSlide.offsetHeight > 0 ) {
          const videoUrl = videoSlide.getAttribute( 'data-video' );
          videoSlide.innerHTML = `<video loop><source src='${ videoUrl }.mp4' type='video/mp4' /><source src='${ videoUrl }.webm' type='video/webm'/></video>`;
          if ( videoSlide.parentElement.classList.contains( 'is-selected' ) ) {
            videoSlide.getElementsByTagName( 'video' )[ 0 ].play();
          }
        }
      } );
    };

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
      updateNavigationMarker();
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
      checkVideo();
    };

    const updateNavigationMarker = () => {
      removeClassPrefix( slider.marker, 'item' );
      slider.marker.classList.add( `hero__marker--item-${ slider.newSlideIndex + 1 }` );
    };

    const updateSliderNavigation = () => {
      slider.navigationItems[ slider.oldSlideIndex ].classList.remove( 'is-selected' );
      slider.navigationItems[ slider.newSlideIndex ].classList.add( 'is-selected' );
    };

    const checkVideo = () => {
      const hiddenVideo = slider.slides[ slider.oldSlideIndex ].getElementsByTagName( 'video' );
      if ( hiddenVideo.length ) {
        hiddenVideo[ 0 ].pause();
      }
      const visibleVideo = slider.slides[ slider.newSlideIndex ].getElementsByTagName( 'video' );
      if ( visibleVideo.length ) {
        visibleVideo[ 0 ].play();
      }
    };

    const init = () => {
      uploadVideo();
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

  const removeClassPrefix = ( el, prefix ) => {
    const classes = el.className.split( ' ' ).filter( ( c ) => !c.startsWith( prefix ) );
    el.className = classes.join( ' ' );
  };

  const initSliders = () => {
    const heroSliders = document.querySelectorAll( '.js-hero' );
    heroSliders.forEach( ( slider ) => new HeroSliderObj( slider ) );
  };

  return {
    init: initSliders
  };
} )();

export default heroSlider;
