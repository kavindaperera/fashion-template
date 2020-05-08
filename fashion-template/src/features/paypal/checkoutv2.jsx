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
          this.props.placeOrder(cartItems, currentStore, items)
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: "0.01",
                },
              },
            ],
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
          });
        }}
        onSuccess={(details) => {
          console.log(details);
        }}

        onCancel={(data) => {
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
