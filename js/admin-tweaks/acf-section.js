/* eslint-disable space-unary-ops */
const sectionDescriptions = ( function () {
  'use strict';

  const updateLayoutDescription = ( layout ) => {
    // get the section description
    const layoutDescription = layout.querySelector( '.acf-fields [data-name=admin_section_description] input' ).value;
    // add that to the layout header
    const layoutHandle = layout.querySelector( '.acf-fc-layout-handle' );

    // Get the text node
    const textNode = layoutHandle.childNodes[ 1 ];

    // Change the text node's value
    textNode.nodeValue = ' ' + layoutDescription;
  };

  const init = () => {
    if ( !document.querySelector( '.acf-fc-layout-handle' ) ) {
      return;
    }

    // let the world know what we are doing
    console.log( 'Adding ACF Section Descriptions' );

    const layouts = document.querySelectorAll( '[data-layout=flex_section]' );
    layouts.forEach( updateLayoutDescription );

    // Create a MutationObserver instance
    const observer = new MutationObserver( ( mutationsList, observer ) => {
      // Look through all mutations that just occured
      for ( const mutation of mutationsList ) {
        // If the addedNodes property has one or more nodes
        if ( mutation.addedNodes.length ) {
          const layouts = document.querySelectorAll( '[data-layout=flex_section]' );
          layouts.forEach( updateLayoutDescription );
        }
      }
    } );

    // Start observing the document with the configured parameters
    observer.observe( document.body, { childList: true, subtree: true } );
  };

  return { init };
}() );

export default sectionDescriptions;
