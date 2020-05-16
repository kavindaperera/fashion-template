import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirestore } from "react-redux-firebase";
import { Breadcrumb, Grid, Segment } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import OrderDetailedStep from "./OrderDetailedStep";

const mapState = (state, ownProps) => {
  const orderId = ownProps.match.params.id;
  const currentStore = ownProps.match.params.store;

  return {
    orderId,
    currentStore,
  };
};

class OrderDetailedPage extends Component {
  render() {
    const { orderId, currentStore } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section
              title="Back to Account Details"
              style={{ color: "grey" }}
              as={Link}
              to={`/${currentStore}/my-account`}
            >
              My Account
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              title="Back to Order History"
              style={{ color: "grey" }}
              as={Link}
              to={`/${currentStore}/my-account/order-history`}
            >
              Order History
            </Breadcrumb.Section>
            <Breadcrumb.Divider
              style={{ color: "grey" }}
              icon="right chevron"
            />
            <Breadcrumb.Section>Order Detail</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Row>
        <Grid.Row stretched>
          <OrderDetailedStep />
        </Grid.Row>
        <Grid.Row stretched>
        <Segment padded='very'>
        Order Number:
        <br/>
        <br/>
        Order Status:
        </Segment>
        </Grid.Row>
        <Grid.Row>
        <Segment padded='very'>
        Contact Name:
        <br/>
        <br/>
        Address:
        <br/>
        <br/>
        Zip Code:
        </Segment>
        </Grid.Row>
        <Grid.Row>

        </Grid.Row>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, null)
)(OrderDetailedPage);
