/* global window, document */

/**
 * Manage logo display
 * If logos list fits on viewport width its static, if not logos will rotate automatically
 *
 * @params {*} none
 * @return {Function} initializes a logo display
 */
const marquees = ( function() {
  const init = () => {
    marqueeLists();
  };

  const checkMarqueeListWidth = ( marquee, viewportWidth ) => {
    // get first marquee list as all lists are the same width
    const marqueeList = marquee.querySelector( '.js-logos' );
    const marqueeListWidth = marqueeList.offsetWidth;
    const containerWidth = marqueeList.closest( '.container' ).offsetWidth;

    // if all logos fit in viewport width and container width, remove animation
    if ( marqueeListWidth < viewportWidth && marqueeListWidth < containerWidth ) {
      marqueeList.closest( '.js-logos-wrapper' ).classList.remove( 'animate' );
      marqueeList.closest( '.js-marquee' ).style.width = marqueeListWidth + 'px';
      marqueeList.closest( '.images-marquee' ).classList.remove( 'is-scrolling' );
    } else {
      marqueeList.closest( '.js-logos-wrapper' ).classList.add( 'animate' );
      marqueeList.closest( '.images-marquee' ).classList.add( 'is-scrolling' );
    }
  };

  const marqueeLists = () => {
    const allMarquees = document.querySelectorAll( '.js-marquee' );
    let viewportWidth = window.innerWidth;

    allMarquees.forEach( ( marquee ) => {
      checkMarqueeListWidth( marquee, viewportWidth );
    } );

    // add a resize observer to check if logos list fits on viewport width
    const resizeObserver = new ResizeObserver( () => {
      viewportWidth = window.innerWidth;

      allMarquees.forEach( ( marquee ) => {
        checkMarqueeListWidth( marquee, viewportWidth );
      } );
    } );

    // observe all logos lists
    allMarquees.forEach( ( marquee ) => {
      resizeObserver.observe( document.body );
    } );
  };

  return { init };
}() );

export default marquees;
