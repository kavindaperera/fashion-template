import React, { Component } from "react";
import { connect } from 'react-redux';
import { Table, Image, Button, Icon, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { removeFromCart } from '../cartActions'
import { NavLink, Link, withRouter } from "react-router-dom";

const actions = {
  removeFromCart
};

class CartListItem extends Component {


  handleItemDelete = (item,currentStore) => async () => {
      this.props.removeFromCart(item,currentStore);
  }
  render() {
    const { symbol, item, mainItems, currentStore, index} = this.props;

    let subItemId = null;
    let selectedItem = null;
    let selectedSubItem = null;


  if (item && mainItems ) {
    subItemId = item.subItem;
    selectedItem = mainItems.filter(product => product.id === item.item)[0];
    selectedSubItem = selectedItem.subItems[subItemId]
  }


    if (!selectedItem && !selectedSubItem) return <LoadingComponent inverted={true} />;

    return (
      <Table.Row >
        <Table.Cell width={3}>       
            <Image
              src={selectedItem.photos[0].url}
              rounded
              size="medium"
              /**/
            />
        </Table.Cell>
        <Table.Cell width={3} textAlign='left' verticalAlign='top'>{selectedItem.name}</Table.Cell>
        <Table.Cell width={3} textAlign='left'  verticalAlign='top'>{symbol}{selectedSubItem.price}</Table.Cell>
        <Table.Cell width={3} textAlign='left'  verticalAlign='top'>{selectedSubItem.variants.map((v,i)=>(
            <div key={i}>{v}</div>
        ))}<a href={`/${currentStore}/collection/product/${selectedItem.id}`} >Edit</a></Table.Cell>
        <Table.Cell width={3} textAlign='left'  verticalAlign='top'>
        </Table.Cell>
        <Table.Cell width={3} textAlign='right' verticalAlign='top'>
            <Button onClick={this.handleItemDelete(item,currentStore)} circular basic  icon='delete' />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, actions)(CartListItem);