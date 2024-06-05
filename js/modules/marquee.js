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

  const checkMarqueeListWidth = ( marqueeList, viewportWidth ) => {
    if ( marqueeList.offsetWidth < viewportWidth ) {
      marqueeList.parentElement.classList.remove( 'animate' );
      marqueeList.parentElement.style.width = marqueeList.offsetWidth + 'px';
      marqueeList.parentElement.parentElement.style.flexDirection = 'row';
    } else {
      marqueeList.parentElement.classList.add( 'animate' );
    }
  };

  const marqueeLists = () => {
    const allMarqueeLists = document.querySelectorAll( '.js-marquee-list' );
    let viewportWidth = window.innerWidth;

    allMarqueeLists.forEach( ( marqueeList ) => {
      checkMarqueeListWidth( marqueeList, viewportWidth );
    } );

    // add a resize observer to check if logos list fits on viewport width
    const resizeObserver = new ResizeObserver( () => {
      viewportWidth = window.innerWidth;

      allMarqueeLists.forEach( ( marqueeList ) => {
        checkMarqueeListWidth( marqueeList, viewportWidth );
      } );
    } );

    // observe all logos lists
    allMarqueeLists.forEach( ( marqueeList ) => {
      resizeObserver.observe( document.body );
    } );
  };

  return { init };
}() );

export default marquees;
