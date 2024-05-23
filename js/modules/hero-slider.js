const heroSlider = ( function () {
  function HeroSliderObj( element ) {
    const slider = {};
    slider.element = element;
    slider.navigation = slider.element.querySelector( '.js-cd-nav' );
    slider.navigationItems = slider.navigation.querySelectorAll( 'li' );
    slider.marker = slider.navigation.querySelector( '.js-cd-marker' );
    slider.slides = slider.element.querySelectorAll( '.js-cd-slide' );
    slider.slidesNumber = slider.slides.length;
    slider.newSlideIndex = 0;
    slider.oldSlideIndex = 0;
    slider.autoplay = hasClass( slider.element, 'js-cd-autoplay' );
    slider.autoPlayId = null;
    slider.autoPlayDelay = 5000;

    function init() {
      // Upload video (if not on mobile devices)
      uploadVideo();
      // Autoplay slider
      setAutoplay();
      // Listen for the click event on the slider navigation
      slider.navigation.addEventListener( 'click', function ( event ) {
        if ( event.target.tagName.toLowerCase() === 'div' ) {
          return;
        }
        event.preventDefault();
        const selectedSlide = event.target;
        if ( hasClass( event.target.parentElement, 'cd-selected' ) ) {
          return;
        }

        slider.oldSlideIndex = slider.newSlideIndex;
        slider.newSlideIndex = Array.prototype.indexOf.call( slider.navigationItems, event.target.parentElement );

        newSlide();
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
          if ( hasClass( videoSlides[ i ].parentElement, 'cd-hero__slide--selected' ) ) {
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
        newSlide();
      } else {
        slider.newSlideIndex = 0;
        newSlide();
      }

      updateNavigationMarker();
      updateSliderNavigation();
    }

    function newSlide() {
      console.log( 'Enter newSlide' );

      console.log( slider.slides );

      removeClass( slider.slides[ slider.oldSlideIndex ], 'cd-hero__slide--selected cd-hero__slide--from-left cd-hero__slide--from-right' );
      addClass( slider.slides[ slider.oldSlideIndex ], 'cd-hero__slide--is-moving' );
      setTimeout( function () {
        removeClass( slider.slides[ slider.oldSlideIndex ], 'cd-hero__slide--is-moving' );
      }, 500 );

      for ( let i = 0; i < slider.slidesNumber; i++ ) {
        if ( i < slider.newSlideIndex && slider.oldSlideIndex < slider.newSlideIndex ) {
          addClass( slider.slides[ i ], 'cd-hero__slide--move-left' );
        } else if ( i == slider.newSlideIndex && slider.oldSlideIndex < slider.newSlideIndex ) {
          addClass( slider.slides[ i ], 'cd-hero__slide--selected cd-hero__slide--from-right' );
        } else if ( i == slider.newSlideIndex && slider.oldSlideIndex > slider.newSlideIndex ) {
          addClass( slider.slides[ i ], 'cd-hero__slide--selected cd-hero__slide--from-left' );
          removeClass( slider.slides[ i ], 'cd-hero__slide--move-left' );
        } else if ( i > slider.newSlideIndex && slider.oldSlideIndex > slider.newSlideIndex ) {
          removeClass( slider.slides[ i ], 'cd-hero__slide--move-left' );
        }
      }

      checkVideo();
    }

    function updateNavigationMarker() {
      console.log( 'in updateNavigationMarker: ', slider.marker );

      removeClassPrefix( slider.marker, 'item' );
      addClass( slider.marker, 'cd-hero__marker--item-' + ( Number( slider.newSlideIndex ) + 1 ) );
    }

    function updateSliderNavigation() {
      console.log( 'in updateSliderNavigation: ', slider.navigationItems[ slider.oldSlideIndex ] );

      removeClass( slider.navigationItems[ slider.oldSlideIndex ], 'cd-selected' );
      addClass( slider.navigationItems[ slider.newSlideIndex ], 'cd-selected' );
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

  //class manipulations - needed if classList is not supported
  function hasClass( el, className ) {
    if ( el.classList ) {
      return el.classList.contains( className );
    }
    return !!el.className.match( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) );
  }

  function addClass( el, className ) {
    const classList = className.split( ' ' );
    if ( el.classList ) {
      el.classList.add( classList[ 0 ] );
    } else if ( !hasClass( el, classList[ 0 ] ) ) {
      el.className += ' ' + classList[ 0 ];
    }
    if ( classList.length > 1 ) {
      addClass( el, classList.slice( 1 ).join( ' ' ) );
    }
  }

  function removeClass( el, className ) {
    const classList = className.split( ' ' );
    if ( el.classList ) {
      el.classList.remove( classList[ 0 ] );
    } else if ( hasClass( el, classList[ 0 ] ) ) {
      const reg = new RegExp( '(\\s|^)' + classList[ 0 ] + '(\\s|$)' );
      el.className = el.className.replace( reg, ' ' );
    }
    if ( classList.length > 1 ) {
      removeClass( el, classList.slice( 1 ).join( ' ' ) );
    }
  }

  function toggleClass( el, className, bool ) {
    if ( bool ) {
      addClass( el, className );
    } else {
      removeClass( el, className );
    }
  }

  function initSliders() {
    const heroSliders = document.querySelectorAll( '.js-hero' );

    console.log( 'heroSliders', heroSliders );

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
        toggleClass( dropdown, 'cd-is-visible', !hasClass( dropdown, 'cd-is-visible' ) );
      }
    } );
    */
  }

  return {
    init: initSliders
  };
}() );

export default heroSlider;
