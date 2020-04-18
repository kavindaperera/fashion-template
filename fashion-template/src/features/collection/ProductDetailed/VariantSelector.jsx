import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Icon, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { toastr } from 'react-redux-toastr'
import { addToCart } from '../../cart/cartActions'


const mapState = (state, ownProps) =>({
  //ownProps:ownProps.match.params
})

const actions = {
  addToCart
};


class VariantSelector extends Component {


    onFormSubmit = values => {
        console.log(values);
        this.props.addToCart(this.props.product,this.props.subItemIndex, this.props.displayPrice,this.props.currentStore);
    };

    render() {

        const {pristine, submitting, stock, product, handleSubmit, initialValues, variants} = this.props;

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

export default connect(mapState, actions)(reduxForm({form: 'variantForm', enableReinitialize: true, destroyOnUnmount: true })(VariantSelector));