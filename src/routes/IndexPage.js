import React from 'react';
import { connect } from 'dva';

import Request from '../components/Request'

import styles from './IndexPage.css';

function IndexPage ( { location } ) {
  return (
    <div className={styles.normal}>
      <Request/>
    </div>
  );
}

export default connect()( IndexPage );
