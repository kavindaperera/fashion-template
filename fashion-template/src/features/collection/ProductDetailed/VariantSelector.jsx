import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import SelectInput from '../../../app/common/form/SelectInput'




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


class VariantSelector extends Component {


    onFormSubmit = values => {
        console.log(values)
      };

    render() {

        const {pristine, submitting, handleSubmit, initialValues, variants} = this.props;
        

        return (
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                {variants && variants.map(variant=>{
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
                      name={title}
                      type="text"
                      component={SelectInput}
                      options={map}
                      placeholder={title}
                    />
                  );
                  })}
                    <Divider/>
                    <Button.Group fluid>
                    <Button labelPosition='right' icon='bookmark outline'  disabled={pristine || submitting} size='large' color='black' content='Add to Bag'/>
                    </Button.Group>
                </Form>

        );
    }
}

export default reduxForm({form: 'variantForm', enableReinitialize: true, destroyOnUnmount: false})(VariantSelector);