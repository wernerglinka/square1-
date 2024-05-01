function loadStyles( url ) {
  // Check if styles are already loaded
  if ( document.querySelector( `link[href="${ url }"]` ) ) {
    return;
  }

  const link = document.createElement( 'link' );
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild( link );
}

export default loadStyles;
