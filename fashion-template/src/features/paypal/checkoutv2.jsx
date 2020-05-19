import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { connect } from "react-redux";
import {Icon,} from 'semantic-ui-react';
import { placeOrder } from "../cart/cartActions";
import {decrementStock, incrementStock} from '../cart/cartActions'
import { toastr } from 'react-redux-toastr'

const mapState = (state, ownProps) => ({
    store: state.firestore.data.selectedStore,
    items: state.firestore.ordered.items,
  });

const actions = {
  placeOrder,
  decrementStock,
  incrementStock
};

class CheckoutX extends Component {
  render() {
    const { currency, total, cartItems, currentStore, store, items } = this.props;

    const toastrOptions = {
      timeOut: 6000,
      icon: (<Icon  circular name='paypal' size='big' />),
      progressBar: true,
    }

    return (
      <PayPalButton
        createOrder={(data, actions) => {
          this.props.decrementStock(cartItems, currentStore, items)
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: total,
                },
              },
            ],
             application_context: {
              shipping_preference: "GET_FROM_FILE" // default is "GET_FROM_FILE"
             }
          });
        }}

        style={ {
          'color' : 'blue',
          'shape' : 'rect',
          'layout' : 'horizontal',
          'tagline' : 'false'
          }}

        onSuccess={(details) => { // Congratulation, it came here means everything's fine!
          console.log(details);
          details && this.props.placeOrder(cartItems, currentStore, items, details) && console.log("deleting from cart") 
          toastr.light('The payment was succeeded!', "Visit Orders page to view progress",toastrOptions)
        }}

        onCancel={(data) => { // User pressed "cancel" or close Paypal's popup!
          console.log("payment canceled")
          this.props.incrementStock(cartItems, currentStore, items)
          console.log(data);
          toastr.error('The payment was cancelled!', "The payment was cancelled!")
        }}

        onError={(details) => { // The main Paypal's script cannot be loaded or somethings block the loading of that script!
          console.log(details);
          toastr.light('Server Error!', "somethings block the loading of paypal!")
        }}

        options={{
          clientId: "AcHAO-vEol-c08pSu9GFksscdth-pVB7sce66pJvLGCeFg7ILKyMl_ZzTENVhcfLV2SVSWTyvlM-Z2JA",
            merchantId: store.merchantId,
        }}
      />
    );
  }
}

export default connect(mapState, actions)(CheckoutX);
