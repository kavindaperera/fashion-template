import React, { Component } from 'react';
import { connect } from "react-redux";
import {Icon,} from 'semantic-ui-react';
import PaypalBtn from 'react-paypal-checkout';
import { toastr } from 'react-redux-toastr'
import { placeOrder } from '../cart/cartActions';



const actions = {
    placeOrder
  };

class Checkout extends Component {

    render() {

        const { currency, total, cartItems, currentStore } = this.props;

        const toastrOptions = {
            timeOut: 6000,
            icon: (<Icon  circular name='paypal' size='big' />),
            progressBar: true,
          }

        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            this.props.placeOrder(cartItems, currentStore);
            toastr.light('The payment was succeeded!', "Visit Orders page to view progress",toastrOptions)
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            toastr.error('The payment was cancelled!', "The payment was cancelled!")
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            toastr.light('The payment was succeeded!', "Visit Orders page to view progress")
        }
        const client = {
            sandbox:    'AcHAO-vEol-c08pSu9GFksscdth-pVB7sce66pJvLGCeFg7ILKyMl_ZzTENVhcfLV2SVSWTyvlM-Z2JA',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        let env = 'sandbox'; // you can set here to 'production' for production

        let style = {
            'label':'pay',
            'tagline': false,
            'size':'medium',
            'shape':'rect',
            'color':'black',
            'fundingicons' : true,
        };

        return (
            <div>
            { (currency) && (total) &&
                <PaypalBtn
                env={env}
                client={client}
                currency={currency}
                total={total}
                style={style}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
            />}</div>
        );
    }
}




export default connect(null, actions)(Checkout);