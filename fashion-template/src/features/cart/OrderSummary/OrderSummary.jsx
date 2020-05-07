import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Container, Button, Icon, Table } from "semantic-ui-react";
import { getCartTotal } from '../../services/index'
import Checkout from '../../paypal/checkout'


const mapState = (state, ownProps) => ({
  items: state.firestore.ordered.items,
  store: state.firestore.data.selectedStore,
});

const actions = {getCartTotal};


class OrderSummary extends Component {
  render() {
    const { cartItems, symbol, items,currentStore, store } = this.props;

    const subtotal = getCartTotal(cartItems, items,currentStore)

    let currency = null;

    if(store){
      currency = store.currency;
    }
    console.log("CURRENCY:", currency)


    return (
      <Container fluid>
        <Table celled color='grey' >
        <Table.Body >
          <Table.Cell>
            <Table.Row>
                <Table.HeaderCell>Order Summary</Table.HeaderCell>
                {cartItems && cartItems.length>1 &&
                <Table.Cell textAlign='left' >{cartItems.length}{" items"}</Table.Cell>}
                {cartItems && cartItems.length===1 &&
                <Table.Cell textAlign='left' >{cartItems.length}{" item"}</Table.Cell>}
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
                {/*<Button labelPosition='right' disabled={subtotal==0} fluid icon='paypal'   size='large' color='black' content='Checkout' />*/}
                <Checkout currency={currency} total={subtotal} cartItems={cartItems} currentStore={currentStore} />
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
