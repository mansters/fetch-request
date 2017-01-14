import fetch from 'dva/fetch';

function parseJSON ( response ) {
  return response.json();
}

function checkStatus ( response ) {
  if ( response.status >= 200 && response.status < 300 ) {
    return response;
  }

  const error    = new Error( response.statusText );
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request ( url, options ) {
  try {
    const _opts = {
      ...options,
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };

    console.log( _opts );

    const response = await fetch( url, _opts );
    return await parseJSON( response );
  } catch ( e ) {
    return {
      message: e.message,
      stack: e.stack
    };
  }
}
