import React, { Component } from "react";
import { Grid, Header, Table } from "semantic-ui-react";
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
      <Grid divided="vertically">
        <Grid.Row>
          <Header as="h3">My Orders</Header>
        </Grid.Row>
        <Grid.Row>
        <Table  collapsing>
            {orders && <OrdersList orders={orders} currentStore={currentStore}/>}
            </Table>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(OrdersDashboard);
