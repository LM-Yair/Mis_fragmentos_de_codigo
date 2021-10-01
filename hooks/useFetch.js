import { useState, useEffect } from 'react';

export const useFetch =  url => {
  const [ data, setData ] = useState( null );
  const [ isPending, setIsPending ] = useState( true );
  const [ error, setError ] = useState( null );

  useEffect(() => {
    const getData = async url =>{
      try{
	let res = await fetch( url );

	if( !res.ok ){
	  throw  { 
	    err: true,
	    status: res.status,
	    statusText: !res.statusText ? 'Ocurrio un error.' : res.statusText,
	  };
	} 
	else {
	  let data = await res.json();
	  setIsPending( false );
	  setData( data );
	  setError( false )
	}
      }
      catch( err ){
	setIsPending( true );
	setError( err );
      }
    }
    getData( url );
  }, [ url ]);

  return{ data, isPending, error };
}
