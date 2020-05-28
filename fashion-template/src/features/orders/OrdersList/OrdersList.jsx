import React, { Component } from "react";
import { connect } from "react-redux";
import { Table,} from "semantic-ui-react";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import OrdersListItem from './OrdersListItem'
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = (state, ownProps) => ({
  mainItems: state.firestore.ordered.items,
  loading: state.async.loading,
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
    const { orders, mainItems, symbol, currentStore, loading } = this.props;

    if(loading) return (<LoadingComponent inverted={true} />)

    if(orders){
      orders.sort((a,b) => a.date.seconds < b.date.seconds ? 1 : -1)
    }

    return (
            <Table.Body>
            {orders && orders.map((order, i) => (
            <OrdersListItem key={i} order={order} currentStore={currentStore} symbol={symbol} items={mainItems}/>
        ))}
        {orders && orders.length==0 && <Table.Row>
                <Table.Cell width={3} textAlign='left' verticalAlign='top'>
                  You haven't ordered any products.
                  <br></br>
                  <a href={`/${currentStore}/collection/all`}>Continue Shopping</a>
                </Table.Cell>
              </Table.Row> }
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
