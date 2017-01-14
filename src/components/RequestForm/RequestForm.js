import React, { Component } from 'react';
import * as REQ_TYPE from '../../constant'

import { Form, Input, Radio, Button, Icon, Row, Col } from 'antd';
const FormItem   = Form.Item;
const RadioGroup = Radio.Group;
import DynamicFormItem from './DynamicFormItem/DynamicFormItem'

import styles from './RequestForm.css';
let uuid = 1;

const DEFAULT_FORM_VALUES = {
  url: '',
  type: REQ_TYPE.GET,
  args: [ { name: '', param: '', uuid: uuid } ]
};

class RequestForm extends Component {

  constructor ( props ) {
    super( props );
  }

  // ----------------------------
  // Handler
  // ----------------------------
  okHandler = ( e ) => {
    e.stopPropagation();

    const { onOk } = this.props;
    this.props.form.validateFields( ( err, values ) => {
      if ( !err ) {

        let _args = values.args.filter( item => !!item.name );

        onOk( {
          url: values.url,
          type: values.type,
          data: values.args
        } );
      }
    } );
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const args = form.getFieldValue( 'args' );
    args.push( {
      name: '',
      param: '',
      uuid: ++uuid
    } );
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue( {
      args: args,
    } );
  };

  edit = ( value, index ) => {
    const { form } = this.props;
    const args    = form.getFieldValue( 'args' );
    args[ index ] = value;
    form.setFieldsValue( {
      args: args
    } );
  };

  remove = ( index ) => {
    const { form } = this.props;
    // can use data-binding to get
    const args = form.getFieldValue( 'args' );
    // We need at least one passenger
    if ( args.length === 1 ) {
      return;
    } else {
      args.splice( index, 1 );
    }

    // can use data-binding to set
    form.setFieldsValue( {
      args: args
    } )
  };

  clearForm = ( e ) => {
    e.preventDefault();
    const { form } = this.props;
    form.setFieldsValue( { ...DEFAULT_FORM_VALUES, args: [ { name: '', param: '', uuid: ++uuid } ] } );
  };

  render () {

    // props
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { url, type } = this.props.formObj;

    // layout
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // args
    getFieldDecorator( 'args', { initialValue: DEFAULT_FORM_VALUES.args } );
    const args = getFieldValue( 'args' );

    return (
      <Form horizontal onSubmit={ this.okHandler }>
        {/* Url */}
        <FormItem { ...formItemLayout } label={ `URL` }>
          {
            getFieldDecorator( 'url', {
              initialValue: url
            } )( <Input/> )
          }
        </FormItem>

        {/* Type */}
        <FormItem { ...formItemLayout } label={ `Request Type` }>
          {
            getFieldDecorator( 'type', {
              initialValue: REQ_TYPE.GET
            } )(
              <RadioGroup>
                <Radio value={ REQ_TYPE.GET }>{ REQ_TYPE.GET }</Radio>
                <Radio value={ REQ_TYPE.POST }>{ REQ_TYPE.POST }</Radio>
                <Radio value={ REQ_TYPE.PUT }>{ REQ_TYPE.PUT }</Radio>
                <Radio value={ REQ_TYPE.PATCH }>{ REQ_TYPE.PATCH }</Radio>
                <Radio value={ REQ_TYPE.DELETE }>{ REQ_TYPE.DELETE }</Radio>
              </RadioGroup>
            )
          }
        </FormItem>

        <FormItem { ...formItemLayout } label={ `Request Arguments` }>
          <DynamicFormItem add={ this.add } edit={ this.edit } del={ this.remove } list={ args }/>
        </FormItem>

        <Button className={ styles[ 'btn-functional' ] } type="primary" htmlType="submit">Submit</Button>
        <Button className={ styles[ 'btn-functional' ] } type="primary" htmlType="button" onClick={ this.clearForm }>Clear</Button>
      </Form>
    )
  }

}

export default Form.create()( RequestForm );
