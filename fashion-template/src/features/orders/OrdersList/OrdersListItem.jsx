import React, { Component } from 'react'
import { Table, Image, Button, Label, Message } from "semantic-ui-react";

export default class OrdersListItem extends Component {
    render() {
        const {order, items} = this.props;
        console.log(order)
        return (
            <Table.Row>
            <Table.Cell width={3}>
            <Image
              src={"/assets/product_list_image.png"}
              rounded
              size="small"
            />
        </Table.Cell>
            <Table.Cell width={3} textAlign="left" verticalAlign="top">
                Order date : {order.date}
            </Table.Cell>
            <Table.Cell width={3} textAlign="left" verticalAlign="top">
                Total : {order.totalPrice.currency_code} {order.totalPrice.value}
            </Table.Cell>
            <Table.Cell width={3} textAlign="right" verticalAlign="top">
          <Button
            circular
            basic
          >view</Button>
        </Table.Cell>
            </Table.Row>
        )
    }
}
