import React, { Component } from "react";
import { Table, Image, Button, Label, Message } from "semantic-ui-react";
import { Link, Route } from "react-router-dom";
import moment from "moment";

export default class OrdersListItem extends Component {
  render() {
    const { order, items, symbol, currentStore } = this.props;

    if (order) {
      let orderStates = order.orderState;
    }

    //console.log(order)

    return (
      <Table.Row>
      {order && order.date && order.id && order.totalPrice &&
        <Table.Row style={{ backgroundColor: "#f5f5f5" }}>
          <Table.Cell
            style={{ color: "black", fontFamily: "Lato", fontSize: "1rem" }}
            width={3}
            textAlign="left"
            verticalAlign="top"
          >
            Order Date :{" "}
            {String(moment(order.date.toDate()).format("HH:MM MMMM Do YYYY "))}
            <br />
            Order ID : {order.id}
          </Table.Cell>
          <Table.Cell
            width={3}
            textAlign="left"
            verticalAlign="top"
            style={{ color: "black", fontFamily: "Lato", fontSize: "1rem" }}
          >
            Order Amount:
            <a style={{ color: "red", fontFamily: "Lato" }}>
              {symbol}
              {(order.totalPrice).toFixed(2)}
            </a>
          </Table.Cell>
          <Table.Cell
            width={3}
            textAlign="right"
            verticalAlign="top"
          ></Table.Cell>
          <Table.Cell width={3} textAlign="right" verticalAlign="top">
            <Button
              circular
              basic
              as={Link}
              to={`../order-detailed/${order.id}`}
            >
              view
            </Button>
          </Table.Cell>
        </Table.Row>}
        {order &&
          items && order.orderItems &&
          order.orderItems.map((item) => {
            let qty = item.noOfItems;
            let price = item.unitPrice;
            let subItemId = item.subItemId;
            let mainItem = items.filter((product) => product.id === item.item);
            //console.log('xxx', mainItem)
            let url = null;
            if(mainItem[0].photos[0]){
               url = mainItem[0].photos[0].thumbnail;
            }

            let name = mainItem[0].name;
            let subItem = mainItem[0].subItems[subItemId];

            return (
              <Table.Row>
                <Table.Cell width={3}>
                  <Image
                    src={url || "/assets/product_list_image.png"}
                    className='order-list-mage'
                    size="small"
                  />
                </Table.Cell>
                <Table.Cell width={6} textAlign="left" verticalAlign="top">
                  {name}
                  <br />
                  <br />
                  {subItem.variants.map((v, i) => (
                    <div key={i}>{v}</div>
                  ))}
                  <a href={`/${currentStore}/collection/product/${mainItem[0].id}`}>
                    View Item
                  </a>
                </Table.Cell>
                <Table.Cell style={{ color: "grey", fontFamily: "Lato" }} width={6} textAlign="left" verticalAlign="top">
                  {symbol}
                  {price}x{qty}
                </Table.Cell>
                <Table.Cell
                  width={3}
                  textAlign="left"
                  verticalAlign="top"
                ></Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Row>
    );
  }
}
