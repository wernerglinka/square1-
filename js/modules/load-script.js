function loadScript( url ) {
  return new Promise( ( resolve, reject ) => {
    const script = document.createElement( 'script' );
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild( script );
  } );
}
export default loadScript;
