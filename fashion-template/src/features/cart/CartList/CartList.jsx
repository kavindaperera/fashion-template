import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Table, Image, Button, Icon, Header } from "semantic-ui-react";
import CartListItem from "./CartListItem";

const mapState = (state, ownProps) => ({
  mainItems: state.firestore.ordered.items,
});

const actions = {};

const query = ({ currentStore,item }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items"}],
      storeAs: "items",
    },
  ];
};

class CartList extends Component {
  render() {
      const {symbol, cartItems, currentStore,mainItems} = this.props

    return (
      <div>
        <Table basic="very"  collapsing>
          <Table.Body>
          {cartItems && cartItems.map((item,i)=> (
            <CartListItem key={i} item={item} mainItems={mainItems} symbol={symbol} currentStore={currentStore} index={i}/>
          ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}


export default connect(
  mapState,
  actions
)(
  firestoreConnect((currentStore, item) => query(currentStore, item))(
    CartList
  )
);
