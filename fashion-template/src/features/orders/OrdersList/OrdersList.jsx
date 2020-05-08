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
    const { orders, mainItems } = this.props;
    return (
        <Table basic="very" collapsing>
            <Table.Body>
            {orders && orders.map((order, i) => (
            <OrdersListItem key={i} order={order} items={mainItems}/>
        ))}
            </Table.Body>
        </Table>
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
