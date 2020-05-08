import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import OrdersList from '../OrdersList/OrdersList';
import { getOrderHistory } from '../ordersAction'

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  orders: state.orders.orderHistory
});

const actions = {getOrderHistory};

class OrdersDashboard extends Component {


  componentDidMount() {
    this.props.getOrderHistory(this.props.auth, this.props.currentStore)
  }
  render() {
    const { orders, currentStore} = this.props;
    return (
      <Grid divided="vertically" columns={2}>
        <Grid.Row>
          <Header as="h3">My Orders</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            {orders && <OrdersList orders={orders} currentStore={currentStore}/>}
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(OrdersDashboard);
