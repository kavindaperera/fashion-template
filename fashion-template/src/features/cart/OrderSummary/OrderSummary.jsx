import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button,  Table } from "semantic-ui-react";
import { getCartTotal, getStockAvailability } from '../../services/index'
import CheckoutX from '../../paypal/checkoutv2'


const mapState = (state, ownProps) => ({
  items: state.firestore.ordered.items,
  store: state.firestore.data.selectedStore,
});

const actions = {getCartTotal, getStockAvailability};


class OrderSummary extends Component {
  render() {
    const { cartItems, symbol, items, currentStore, store } = this.props;

    let currency = null;
    let enableInventoryManagement = false;

    if(store){
      currency = store.currency;
      enableInventoryManagement = store.enableInventoryManagement;
    }

    const subtotal = getCartTotal(cartItems, items,currentStore)
    const availability = getStockAvailability(cartItems, items, enableInventoryManagement)
    //console.log(availability)

    
    //console.log("CURRENCY:", currency)


    return (
      <Container fluid>
        <Table celled color='grey' >
        <Table.Body >
          <Table.Cell>
            <Table.Row>
                <Table.HeaderCell>Order Summary</Table.HeaderCell>
                {cartItems && cartItems.length>1 &&
                <Table.Cell textAlign='left' >{cartItems.length}{" styles"}</Table.Cell>}
                {cartItems && cartItems.length===1 &&
                <Table.Cell textAlign='left' >{cartItems.length}{" style"}</Table.Cell>}
                {cartItems && cartItems.length===0 &&
                <Table.Cell textAlign='left' >{""}</Table.Cell>}
            </Table.Row>
            <Table.Row>
                <Table.Cell width={15} textAlign='left' >Subtotal</Table.Cell>
                <Table.Cell width={10} textAlign='right' style={{ color: "black", fontFamily: "Lato" }} >{symbol}{subtotal}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell width={15} textAlign='left' >Shipping estimate</Table.Cell>
                <Table.Cell width={10} textAlign='right' >{"Free"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell width={15} textAlign='left' >Estimated Total</Table.HeaderCell>
                <Table.Cell width={10} textAlign='right' style={{ color: "black", fontSize: "1.5rem", fontFamily: "Lato" }} >{symbol}{subtotal}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>
                <Button className='paypal-button' basic fluid disabled={!availability}><CheckoutX currency={currency} total={subtotal} cartItems={cartItems} currentStore={currentStore} /></Button>
                {/* <Checkout currency={currency} total={subtotal} cartItems={cartItems} currentStore={currentStore} />*/}
            </Table.Cell>
            </Table.Row>
          </Table.Cell>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default connect(mapState,actions)(OrderSummary);
