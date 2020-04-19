import React, { Component } from "react";
import { Card, Container, Button, Icon, Table } from "semantic-ui-react";

class OrderSummary extends Component {
  render() {
    const { cartItems, symbol } = this.props;
    console.log("OSum", cartItems);
    let subtotal = 0;
    if (cartItems) {
      cartItems.map((item) => (subtotal += item.price));
    }

    return (
      <Container fluid>
        <Table celled color='grey' >
        <Table.Body >
          <Table.Cell>
            <Table.Row>
                <Table.HeaderCell>Order Summary</Table.HeaderCell>
                {cartItems && 
                <Table.Cell textAlign='left' >{cartItems.length}{" items"}</Table.Cell>}
            </Table.Row>
            <Table.Row>
                <Table.Cell width={15} textAlign='left' >Subtotal</Table.Cell>
                <Table.Cell width={10} textAlign='right' >{symbol}{subtotal}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell width={15} textAlign='left' >Shipping estimate</Table.Cell>
                <Table.Cell width={10} textAlign='right' >{"Free"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell width={15} textAlign='left' >Estimated Total</Table.HeaderCell>
                <Table.Cell width={10} textAlign='right' style={{ color: "black", fontSize: "1.5rem" }} >{symbol}{subtotal}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>
                <Button labelPosition='right' disabled={subtotal==0} fluid icon='paypal'   size='large' color='black' content='Checkout' />
            </Table.Cell>
            </Table.Row>
          </Table.Cell>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default OrderSummary;
