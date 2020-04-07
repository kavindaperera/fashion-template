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

        const {pristine, submitting, handleSubmit, initialValues} = this.props;
        console.log("initialValues",initialValues)

        return (
            <Segment>
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field
                name="size"
                type="text"
                component={SelectInput}
                options={sizes}
                placeholder="size"
              />
              <Field
                name="color"
                type="text"
                component={SelectInput}
                options={colors}
                placeholder="color"
              />
                    <Divider/>
                    <Button.Group fluid>
                    <Button labelPosition='right' icon='bookmark outline'  disabled={pristine || submitting} size='large' color='black' content='Add to Bag'/>
                    </Button.Group>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'variantForm', enableReinitialize: true, destroyOnUnmount: false})(VariantSelector);