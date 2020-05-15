import React, { Component } from "react";
import { Table, Image, Button, Label, Message } from "semantic-ui-react";
import moment from "moment";

export default class OrdersListItem extends Component {
  render() {
    const { order, items } = this.props;

    return (
      <Table.Row>
        <Table.Row  style={{backgroundColor:'#dfe6e9'}}>
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
            <a style={{ color: "red", fontFamily: "Lato"  }}>
            {order.totalPrice}
            </a>
          </Table.Cell>
          <Table.Cell width={3} textAlign="right" verticalAlign="top">

          </Table.Cell>
          <Table.Cell width={3} textAlign="right" verticalAlign="top">
            <Button circular basic>
              view
            </Button>
          </Table.Cell>
        </Table.Row>
        {order && items &&
          order.orderItems.map((item) => {
            let qty = (item.noOfItems);
            let price = (item.unitPrice);
            let subItemId = item.subItemId;
            let mainItem = items.filter((product) => product.id === item.item);
            let url = mainItem[0].photos[0].thumbnail;
            let name = mainItem[0].name;
            let subItem = mainItem[0].subItems[subItemId];
            return (
              <Table.Row>
                <Table.Cell width={3}>
                  <Image
                    src={url || "/assets/product_list_image.png"}
                    rounded
                    size="small"
                  />
                </Table.Cell>
                <Table.Cell width={6} textAlign="left" verticalAlign="top">
                  {name}
                </Table.Cell>
                <Table.Cell width={6} textAlign="left" verticalAlign="top">
                  {price}x{qty}
                </Table.Cell>
                <Table.Cell width={3} textAlign="left" verticalAlign="top">
                  {subItem.variants.map((v, i) => (
                    <div key={i}>{v}</div>
                  ))}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Row>
    );
  }
}
