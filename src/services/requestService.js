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
      body: StringifyJson( data )
    } );
  },
  [ REQ_TYPE.PUT ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.PUT,
      body: StringifyJson( data )
    } )
  },
  [ REQ_TYPE.PATCH ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.PATCH,
      body: StringifyJson( data )
    } )
  },
  [ REQ_TYPE.DELETE ]: function ( url, data ) {
    return req( url, {
      method: REQ_TYPE.DELETE,
      body: StringifyJson( data )
    } )
  }

};

function StringifyJson ( value ) {
  return JSON.stringify( value );
}

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
  let args = `${ url }?`;
  data.map( ( item ) => {
    if ( item.name.length !== 0 ) {
      args = `${ args + item.name }=${ item.param }&`;
    }
  } );

  return `${ url }?${ SerializationParams( data ) }`;
}
