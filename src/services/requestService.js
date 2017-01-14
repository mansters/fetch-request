import req from '../utils/request';
import * as REQ_TYPE from '../constant'

export function request ( url, type, data ) {
  return REQUEST_HANDLER[ type ]( url, data );
}

const REQUEST_HANDLER = {
  [ REQ_TYPE.GET ]: function ( url, data ) {
    return req( SerializationUrl( url, data ) );
  },
  [ REQ_TYPE.POST ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.POST,
      body: SerializationArguments( data )
    } );
  },
  [ REQ_TYPE.PUT ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.PUT,
      body: SerializationArguments( data )
    } )
  },
  [ REQ_TYPE.PATCH ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.PATCH,
      body: SerializationArguments( data )
    } )
  },
  [ REQ_TYPE.DELETE ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.DELETE,
      body: SerializationArguments( data )
    } )
  }

};

// ----------------------------
// Serialization
// ----------------------------
function SerializationParams ( data ) {
  let args = '';
  data.map( ( item ) => {
    if ( item.name.length !== 0 ) {
      args = `${ args + item.name }=${ item.param }&`;
    }
  } );
  return args.substr( 0, args.length - 1 );
}

function SerializationUrl ( url, data ) {
  return `${ url }?${ SerializationParams( data ) }`;
}

function SerializationArguments ( data ) {
  let args = {};
  data.map( ( item ) => {
    if ( item.name.length !== 0 ) {
      args[ item.name ] = item.param;
    }
  } );
  return JSON.stringify(args);
}
