import React, { Component } from "react";
import { Grid, Header, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import OrdersList from '../OrdersList/OrdersList';
import { getOrderHistory } from '../ordersAction';
import { Helmet } from "react-helmet";

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  orders: state.orders.orderHistory,
  symbol: state.collection.symbol,
  store: state.firestore.data.selectedStore,
});

const actions = {getOrderHistory};

class OrdersDashboard extends Component {


  componentDidMount() {
    this.props.getOrderHistory(this.props.auth, this.props.currentStore)
  }
  render() {
    const { orders, currentStore, symbol, store} = this.props;
    return (
      <div>{ store &&
        <div>
        <Helmet>
              <title>My Orders | {store.storeName}</title>
            </Helmet>
      <Grid divided="vertically">
        <Grid.Row>
          <Header as="h3">My Orders</Header>
        </Grid.Row>
        <Grid.Row>
        <Table >
            {orders && <OrdersList orders={orders} symbol={symbol} currentStore={currentStore}/>}
            </Table>
        </Grid.Row>
      </Grid></div>}</div>
    );
  }
}

export default connect(mapState,actions)(OrdersDashboard);
