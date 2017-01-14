import React from 'react';
import { connect } from 'dva'

import { Row, Col } from 'antd'
import RequestForm from './RequestForm/RequestForm'

import styles from './Request.css'

const Request = ( { dispatch, resMsg } ) => {
  // ----------------------------
  // Handler
  // ----------------------------
  function requestHandler ( values ) {
    dispatch( {
      type: 'request/fetch',
      payload: values
    } );
  }

  const layoutConf = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
  };

  let defaultForm = {
    url: null,
    type: null,
    args: [
      {
        name: '',
        param: ''
      }
    ]
  };

  return (
    <div className={ styles[ 'layout-center' ] }>
      <Row gutter={ 16 }>
        <Col { ...layoutConf }>
          <RequestForm formObj={ defaultForm } onOk={ requestHandler }/>
        </Col>
        <Col { ...layoutConf }>
          <p className={ styles[ 'log' ] }>
            { resMsg }
          </p>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps ( state ) {
  const { resMsg } = state.request;
  return {
    resMsg
  }
}

export default connect( mapStateToProps )( Request );
