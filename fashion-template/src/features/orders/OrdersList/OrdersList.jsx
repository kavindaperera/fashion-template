import React, { Component } from "react";
import { connect } from "react-redux";
import { Table,} from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import OrdersListItem from './OrdersListItem'

const mapState = (state, ownProps) => ({
  mainItems: state.firestore.ordered.items,
});

const query = ({ currentStore }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items" }],
      storeAs: "items",
    },
  ];
};

class OrdersList extends Component {
  render() {
    const { orders, mainItems, symbol, currentStore } = this.props;
    if(orders){
      orders.sort((a,b) => a.date.seconds < b.date.seconds ? 1 : -1)
    }
    return (
            <Table.Body>
            {orders && orders.map((order, i) => (
            <OrdersListItem key={i} order={order} currentStore={currentStore} symbol={symbol} items={mainItems}/>
        ))}
            </Table.Body>
    );
  }
}

export default connect(
  mapState,
  null
)(
  firestoreConnect((currentStore) => query(currentStore))(
    OrdersList
  )
);
