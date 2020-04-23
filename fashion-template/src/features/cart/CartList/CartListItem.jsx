import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Image, Button, Label, Icon, Form } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import SelectInput from "../../../app/common/form/SelectInput";
import { removeFromCart } from "../cartActions";
import { NavLink, Link, withRouter } from "react-router-dom";
import PriceTagCart from "../../pricetag/PriceTagCart";
import moment from "moment";
import {editItemQuantity} from '../../cart/cartActions'

const actions = {
  removeFromCart,
  editItemQuantity
};

class CartListItem extends Component {


  handleItemDelete = (item, currentStore) => async () => {
    this.props.removeFromCart(item, currentStore);
  };

  handleChange = (index, currentStore) => {
    this.props.editItemQuantity(index, currentStore);
  };

  render() {
    const {
      pristine,
      submitting,
      handleSubmit,
      symbol,
      item,
      mainItems,
      currentStore,
      index,
    } = this.props;


    console.log(index);

    let subItemId = null;
    let selectedItem = null;
    let selectedSubItem = null;

    let discountActive = false;
    let discount = 0;
    let stock = 0;
  

    if (item && mainItems) {
      subItemId = item.subItem;
      selectedItem = mainItems.filter((product) => product.id === item.item)[0];
      selectedSubItem = selectedItem.subItems[subItemId];
      stock = selectedSubItem.stock;
    }



    let quantity = [];

    for (var i = 1; i <= stock; i++) {
      let x = { key: i, text: i, value: i };
      quantity.push(x);
    }

    //checking Discount Status
    if (selectedItem.discount != null) {
      const dateNow = moment().format("X");
      const startDate = selectedItem.discount.startDate.seconds;
      const endDate = selectedItem.discount.endDate.seconds;
      discountActive = startDate < dateNow && dateNow < endDate;
      discount = selectedItem.discount.percentage;
    }

    if (!selectedItem && !selectedSubItem)
      return <LoadingComponent inverted={true} />;

    return (
      <Table.Row>
        <Table.Cell width={3}>
          {selectedItem.photos[0] && (
            <Image
              src={
                selectedItem.photos[0].url || "/assets/product_list_image.png"
              }
              rounded
              size="medium"
            />
          )}

          {!selectedItem.photos[0] && (
            <Image
              src={"/assets/product_list_image.png"}
              rounded
              size="medium"
            />
          )}
        </Table.Cell>
        <Table.Cell width={3} textAlign="left" verticalAlign="top">
          {selectedItem.name}
        </Table.Cell>
        <Table.Cell width={3} textAlign="left" verticalAlign="top">
          <PriceTagCart
            currency={symbol}
            price={selectedSubItem.price}
            discount={discount}
            discountActive={discountActive}
          ></PriceTagCart>
        </Table.Cell>
        <Table.Cell width={3} textAlign="left" verticalAlign="top">
          {selectedSubItem.variants.map((v, i) => (
            <div key={i}>{v}</div>
          ))}
          <a href={`/${currentStore}/collection/product/${selectedItem.id}`}>
            Edit
          </a>
        </Table.Cell>
        <Table.Cell width={3} textAlign="left" verticalAlign="top">
              <Button size="mini" icon='minus' onClick={()=>this.handleChange()} />
              <Label basic size="medium" >{item.quantity}</Label>
              <Button size="mini" icon='plus' onClick={()=>this.handleChange(index, currentStore)} />
        </Table.Cell>
        <Table.Cell width={3} textAlign="right" verticalAlign="top">
          <Button
            onClick={this.handleItemDelete(item, currentStore)}
            circular
            basic
            icon="delete"
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, actions)(CartListItem);
