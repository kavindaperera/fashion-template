import React, {Component} from 'react';
import {Icon, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { toastr } from 'react-redux-toastr'

const sizes = [
    { key: "xxs", text: "XXS", value: "xxs" },
    { key: "xs", text: "XS", value: "xs" },
    { key: "s", text: "S", value: "s" },
    { key: "m", text: "M", value: "m" },
    { key: "l", text: "L", value: "l" },
    { key: "xl", text: "XL", value: "xl" },
    { key: "xxl", text: "XXL", value: "xxl" }
  ];

  const colors = [
    { key: "red", text: "Red", value: "red" },
    { key: "blue", text: "Blue", value: "blue" },
  ];


  const toastrOptions = {
    timeOut: 3000,
    icon: (<Icon  circular name='shopping bag' size='big' />),
    progressBar: true,
  }

class VariantSelector extends Component {


    onFormSubmit = values => {
        console.log(values);
        toastr.success('Added To Bag', 'Don’t miss out: Items in your bag are not reserved until payment is complete', toastrOptions)
    };

    render() {

        const {pristine, submitting, stock, handleSubmit, initialValues, variants} = this.props;

        return (
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                {variants && variants.map((variant, i)=>{
                  let title = variant.title;
                  let attributes = variant.attributes;
                  let map = [];
                  // eslint-disable-next-line no-lone-blocks
                  {attributes && attributes.map(a => {
                    let att = a.attribute;
                    let array = {key:att, text:att, value:att};
                    map.push(array)
                  })};
                  return (
                    <Field
                      key={variant.title}
                      name={i}
                      type="text"
                      component={SelectInput}
                      options={map}
                      placeholder={title}
                    />
                  );
                  })}
                    <Divider/>
                    <Button.Group fluid>
                    <Button labelPosition='right' icon='bookmark outline'  disabled={pristine || submitting || !stock} size='large' color='black' content='Add to Bag'/>
                    </Button.Group>
                </Form>

        );
    }
}

export default reduxForm({form: 'variantForm', enableReinitialize: true, destroyOnUnmount: true })(VariantSelector);