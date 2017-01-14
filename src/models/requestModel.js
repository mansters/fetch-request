import * as requestService from '../services/requestService';

export default {

  namespace: 'request',

  state: {
    resMsg: ''
  },

  reducers: {
    save( state, action ) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *fetch( { payload: { url, type, data } }, { call, put } ) {  // eslint-disable-line
      console.log( url, type, data );
      const res = yield call( requestService.request, url, type, data );
      console.log( res );
      yield put( {
        type: 'save',
        payload: {
          resMsg: JSON.stringify( res )
        }
      } );
    },
  },

  subscriptions: {
    setup( { dispatch, history } ) {  // eslint-disable-line
    },
  },

};
