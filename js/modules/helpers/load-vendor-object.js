function loadVendorObject( url, globalObjectName, timeout = 5000 ) {
  return new Promise( ( resolve, reject ) => {
    // Check if the global object is already available
    if ( window[ globalObjectName ] ) {
      resolve();
      return;
    }

    const script = document.createElement( 'script' );
    script.src = url;
    script.async = true;

    const timeoutId = setTimeout( () => {
      reject( new Error( `Timed out after ${ timeout }ms while loading script: ${ url }` ) );
    }, timeout );

    script.onload = () => {
      clearTimeout( timeoutId );

      const checkGlobalObject = () => {
        if ( window[ globalObjectName ] ) {
          resolve();
        } else {
          setTimeout( checkGlobalObject, 100 ); // Check again after 100ms
        }
      };
      checkGlobalObject();
    };

    script.onerror = () => {
      clearTimeout( timeoutId );
      reject( new Error( `Failed to load script: ${ url }` ) );
    };

    document.head.appendChild( script );
  } );
}

export default loadVendorObject;
