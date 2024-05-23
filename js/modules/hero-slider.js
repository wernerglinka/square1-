const heroSlider = ( function () {
  function HeroSliderObj( element ) {
    const slider = {};
    slider.element = element;
    slider.navigation = slider.element.querySelector( '.js-nav' );
    slider.navigationItems = Array.from( slider.navigation.querySelectorAll( 'li' ) );
    slider.marker = slider.navigation.querySelector( '.js-marker' );
    slider.slides = Array.from( slider.element.querySelectorAll( '.js-slide' ) );
    slider.slidesNumber = slider.slides.length;
    slider.newSlideIndex = 0;
    slider.oldSlideIndex = 0;
    slider.autoplay = slider.element.classList.contains( 'is-autoplay' );
    slider.autoPlayId = null;
    slider.autoPlayDelay = 5000;

    function init() {
      // Upload video (if not on mobile devices)
      uploadVideo();
      // Autoplay slider
      setAutoplay();
      // Listen for the click event on the slider navigation
      slider.navigation.addEventListener( 'click', function ( event ) {
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

        renderNewSlide();
        updateNavigationMarker();
        updateSliderNavigation();
        setAutoplay();
      } );

      if ( slider.autoplay ) {
        // On hover - pause autoplay
        slider.element.addEventListener( 'mouseenter', function () {
          clearInterval( slider.autoPlayId );
        } );
        slider.element.addEventListener( 'mouseleave', function () {
          setAutoplay();
        } );
      }
    }

    function uploadVideo() {
      const videoSlides = slider.element.getElementsByClassName( 'js-cd-bg-video' );
      for ( let i = 0; i < videoSlides.length; i++ ) {
        if ( videoSlides[ i ].offsetHeight > 0 ) {
          // if visible - we are not on a mobile device
          const videoUrl = videoSlides[ i ].getAttribute( 'data-video' );
          videoSlides[ i ].innerHTML = "<video loop><source src='" + videoUrl + ".mp4' type='video/mp4' /><source src='" + videoUrl + ".webm' type='video/webm'/></video>";
          // if the visible slide has a video - play it
          if ( videoSlides[ i ].parentElement.classList.contains( 'is-selected' ) ) {
            videoSlides[ i ].getElementsByTagName( 'video' )[ 0 ].play();
          }
        }
      }
    }

    function setAutoplay() {
      if ( slider.autoplay ) {
        clearInterval( slider.autoPlayId );
        slider.autoPlayId = window.setInterval( function () {
          autoplaySlider();
        }, slider.autoPlayDelay );
      }
    }

    function autoplaySlider() {
      slider.oldSlideIndex = slider.newSlideIndex;

      if ( slider.newSlideIndex < slider.slidesNumber - 1 ) {
        slider.newSlideIndex += 1;
        renderNewSlide();
      } else {
        slider.newSlideIndex = 0;
        renderNewSlide();
      }

      updateNavigationMarker();
      updateSliderNavigation();
    }

    function renderNewSlide() {
      const oldSlide = slider.slides[ slider.oldSlideIndex ];
      oldSlide.classList.remove( 'is-selected' );
      oldSlide.classList.add( 'is-moving' );

      const newSlide = slider.slides[ slider.newSlideIndex ];
      newSlide.classList.add( 'is-selected' );

      oldSlide.addEventListener( 'transitionend', function handler() {
        // Remove the event listener after it has executed
        oldSlide.removeEventListener( 'transitionend', handler );
        oldSlide.classList.remove( 'is-moving' );
      } );

      checkVideo();
    }

    function updateNavigationMarker() {
      removeClassPrefix( slider.marker, 'item' );
      slider.marker.classList.add( 'hero__marker--item-' + ( Number( slider.newSlideIndex ) + 1 ) );
    }

    function updateSliderNavigation() {
      slider.navigationItems[ slider.oldSlideIndex ].classList.remove( 'is-selected' );
      slider.navigationItems[ slider.newSlideIndex ].classList.add( 'is-selected' );
    }

    function checkVideo() {
      //check if a video outside the viewport is playing - if yes, pause it
      const hiddenVideo = slider.slides[ slider.oldSlideIndex ].getElementsByTagName( 'video' );
      if ( hiddenVideo.length ) {
        hiddenVideo[ 0 ].pause();
      }

      //check if the select slide contains a video element - if yes, play the video
      const visibleVideo = slider.slides[ slider.newSlideIndex ].getElementsByTagName( 'video' );
      if ( visibleVideo.length ) {
        visibleVideo[ 0 ].play();
      }
    }

    init();

    return slider;
  }

  function removeClassPrefix( el, prefix ) {
    //remove all classes starting with 'prefix'
    const classes = el.className.split( ' ' ).filter( function ( c ) {
      return c.indexOf( prefix ) < 0;
    } );
    el.className = classes.join( ' ' );
  }

  function initSliders() {
    const heroSliders = document.querySelectorAll( '.js-hero' );

    if ( heroSliders.length > 0 ) {
      heroSliders.forEach( function ( thisSlider ) {
        new HeroSliderObj( thisSlider );
      } );
    }
    /*
    // On mobile - open/close primary navigation clicking/tapping the menu icon
    document.querySelector( '.js-cd-header__nav' ).addEventListener( 'click', function ( event ) {
      if ( event.target.tagName.toLowerCase() == 'nav' ) {
        const dropdown = this.querySelector( 'ul' );
        dropdown.classList.toggle('cd-is-visible');
      }
    } );
    */
  }

  return {
    init: initSliders
  };
}() );

export default heroSlider;
