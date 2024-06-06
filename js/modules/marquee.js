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

    if ( marqueeList.offsetWidth < viewportWidth ) {
      marqueeList.closest( '.js-logos-wrapper' ).classList.remove( 'animate' );
      marqueeList.closest( '.js-marquee' ).style.width = marqueeList.offsetWidth + 'px';
    } else {
      marqueeList.closest( '.js-logos-wrapper' ).classList.add( 'animate' );
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
