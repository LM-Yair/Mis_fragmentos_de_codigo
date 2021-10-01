export const helpHttp = () => {
  const customFetch = ( endPoint, options ) => {
    const defaultHeader = {
      accept: 'applications/json',
    }

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || 'GET';
    options.headers = options.headers 
      ? { ...defaultHeader, ...options.headers } 
      : defaultHeader;

    options.body = JSON.stringify( options.body ) || false;
    if( !options.body ) delete options.body;

    setTimeout( () => controller.abort() ,2000);

    return fetch( endPoint,options )
      .then( res => res.ok 
	? res.json()
	: Promise.reject({
	  err: true,
	  status: res.status || '00',
	  statusText: res.statusText || 'Ocurrió un error.',
	})
      )
      .catch( err => err );
  }
  
  const GET = ( url, options = {} ) => customFetch( url, options );
  
  const POST = ( url, options = {} ) => {
    options.method = 'POST';
    return customFetch( url, options );
  }

  const PUT = ( url, options = {} ) => {
    options.method = 'PUT';
    return customFetch( url, options );
  }
  
  const DEL = ( url, options = {} ) => {
    options.method = 'DELETE';
    return customFetch( url, options );
  }

  return{
    GET,
    POST,
    PUT,
    DEL,
  };
}
