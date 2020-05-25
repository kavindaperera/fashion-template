import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirestore, isLoaded, isEmpty} from "react-redux-firebase";
import { Breadcrumb, Grid, Segment, Tab, } from "semantic-ui-react";
import { Link } from "react-router-dom";
import OrderDetailedItemList from './OrderDetailedItemList'
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import LoadingComponent from "../../../app/layout/LoadingComponent"
import OrderNotFound from '../../pages/OrderNotFound/OrderNotFound'

const mapState = (state, ownProps) => {
  const orderId = ownProps.match.params.id;
  const currentStore = ownProps.match.params.store;
  const order = state.firestore.data.order;
  const config = state.firestore.data.config;
  const symbol = state.collection.symbol;

  return {
    orderId,
    currentStore,
    order,
    config,
    symbol
  };
};

const query = ({ currentStore, orderId }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Orders" }],
      storeAs: "order",
      where: [["id", "==", orderId]],
    },
  ];
};

class OrderDetailedPage extends Component {
  render() {
    const { orderId, currentStore, order, config ,symbol} = this.props;

    if(!isLoaded(order)) { return <LoadingComponent inverted={true} />; }


    if(isLoaded(order)) {

      if (isEmpty(order)) return <OrderNotFound />;

    }

    let orderStates = null;
    let orderStatesX = null;
    let currentOrderState = null;
    let name = "N/A";
    let address_line_1 = "N/A";
    let admin_area_1 = "N/A";
    let admin_area_2 = "N/A";
    let country_code = "N/A";
    let postal_code = "N/A";

    let orderStatesConfig = null;

    if (config) {
      orderStatesConfig = config.orderStates;
    }

    if (order && order[orderId] && order[orderId].orderState) {
      orderStates = order[orderId].orderState;
      orderStatesX = order[orderId].orderState;
      const address = order[orderId].shippingAddress;
      currentOrderState = orderStates.pop();
      name = address.name.full_name;
      address_line_1 = address.address.address_line_1;
      admin_area_1 = address.address.admin_area_1;
      admin_area_2 = address.address.admin_area_2;
      country_code = address.address.country_code;
      postal_code = address.address.postal_code;
    }

    const panes = [
      {
        menuItem: "Shipping Information",
        render: () => (
          <Tab.Pane attached={false}>
            <p>
              <strong>Contact Name:</strong> {name}
            </p>
            <p>
              <strong>Address:</strong> {address_line_1}, {admin_area_1},{" "}
              {admin_area_2}, {country_code}
            </p>
            <p>
              <strong>Zip Code:</strong> {postal_code}
            </p>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Logistics Information",
        render: () => (
          <Tab.Pane style={{fontFamily: "Lato" }} attached={false}>
            {orderStatesX.map((s) => (<div>
              <p>{moment(s['date'].toDate()).format('LLLL')}:  {orderStatesConfig[s['stateId']]}</p></div>
            ))}
            <p>{moment(currentOrderState.date.toDate()).format('LLLL')}:  {orderStatesConfig[currentOrderState.stateId]}</p>

          </Tab.Pane>
        ),
      },
    ];

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
        <Grid.Row>
          {/*<OrderDetailedStep state={currentOrderStateId}/>*/}
        </Grid.Row>

        <Grid centered>
          <Grid.Column width={10}>
            <Grid.Row></Grid.Row>
            {currentOrderState != null ? (
              <Segment
                textAlign="left"
                title={currentOrderState.date}
                padded="very"
                inverted
              >
                Order Number: {orderId}
                <br />
                <br />
                Order Status:{" "}
                <strong>
                  {orderStatesConfig[currentOrderState.stateId]}
                </strong>{" "}
                {moment(currentOrderState.date.toDate()).fromNow()}
              </Segment>
            ) : (
              ""
            )}

            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Grid.Column>
          <Grid.Column width={6}>
            {order &&  <OrderDetailedItemList order={order[orderId]} currentStore={currentStore} symbol={symbol} />}
          </Grid.Column>
          <Grid.Row></Grid.Row>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, null),
  firestoreConnect((currentStore, orderId) => query(currentStore, orderId))
)(OrderDetailedPage);
