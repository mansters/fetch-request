import React, { Component } from 'react';

import { Form, Input, Button, Icon, Row, Col } from 'antd';
const FormItem   = Form.Item;
const InputGroup = Input.Group;

import styles from './DynamicFormItem.css';

class DynamicFormItem extends Component {
  constructor ( props ) {
    super( props )
  }

  // ----------------------------
  // Handler
  // ----------------------------
  addHandler = ( e ) => {
    e.preventDefault();
    const { add } = this.props;
    add();
  };

  editHandler = ( values, index ) => {
    const { edit } = this.props;
    edit( values, index );
  };

  deleteHandler = ( index ) => {
    const { del } = this.props;
    del( index );
  };

  // ----------------------------
  // Render
  // ----------------------------
  createDynamicItem = ( list ) => {
    return list.map( ( item, index ) => {
      console.info( item, index );
      return (
        <div className={ styles[ 'params-row' ] } key={ item.uuid }>
          <InputGroup>
            <Col span="8">
              <Input defaultValue={ item.name } onChange={ ( e ) => this.editHandler( { ...item, name: e.target.value }, index ) }/>
            </Col>
            <Col span="14">
              <Input defaultValue={ item.param } onChange={ ( e ) => this.editHandler( { ...item, param: e.target.value }, index ) }/>
            </Col>
            <Col span="2">
              <Icon
                className={ styles[ 'dynamic-delete-button' ] }
                type="minus-circle-o"
                disabled={ list.length === 1 }
                onClick={ () => this.deleteHandler( index ) }
              />
            </Col>
          </InputGroup>
        </div>
      )
    } );
  };

  render () {

    const { list } = this.props;

    return (
      <div>
        { this.createDynamicItem( list ) }
          <Button type="dashed" onClick={ this.addHandler } style={{ width: '60%' }}>
            <Icon type="plus" /> Add Fields
          </Button>
      </div>
    )
  }

}

export default DynamicFormItem;
