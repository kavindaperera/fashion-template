import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { connect } from "react-redux";
import { placeOrder } from "../cart/cartActions";

const mapState = (state, ownProps) => ({
    store: state.firestore.data.selectedStore,
    items: state.firestore.ordered.items,
  });

const actions = {
  placeOrder,
};

class CheckoutX extends Component {
  render() {
    const { currency, total, cartItems, currentStore, store, items } = this.props;

    return (
      <PayPalButton
        createOrder={(data, actions) => {
          console.log('reserving stock')
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

        onSuccess={(details) => {
          console.log(details);
          details && this.props.placeOrder(cartItems, currentStore, items, details) && console.log("deleting from cart")
        }}

        onCancel={(data) => {
          console.log("payment canceled")
          console.log('replacing stock')
          console.log(data);
        }}

        onError={(details) => {
          console.log(details);
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
