import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Table, Image, Button, Icon, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { queryAllByAltText } from "@testing-library/react";
import StickyBox from "react-sticky-box";
import OrderSummary from "../OrderSummary/OrderSummary";
import CartList from "../CartList/CartList";
import { getCart } from '../cartActions'

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  user: state.firestore.data.user,
  symbol: state.collection.symbol,
  cartItems: state.cart.cart
});

const actions = {getCart};

const query = ({ currentStore, auth }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Buyers", doc: auth.uid }],
      storeAs: "user",
    },
  ];
};

class CartDashboard extends Component {
  render() {
    const { auth, loading, user, symbol, currentStore, cartItems, getCart } = this.props;


    if (user) {
      getCart(user);
      console.log('dashboard_1',cartItems)
    }

    if (!cartItems) return <LoadingComponent inverted={true} />;

    return (
      <Grid  divided='vertically' columns={2}>
      <Grid.Row><Header as="h3">My Bag</Header></Grid.Row>
      <Grid.Row>
          <Grid.Column  width={10}>
            <CartList currentStore={currentStore} symbol={symbol} cartItems={cartItems}/>
          </Grid.Column>
          <Grid.Column width={4}>
          {cartItems &&  cartItems.length>0 && (
            <StickyBox offsetTop={70} offsetBottom={20}>
             <OrderSummary symbol={symbol} currentStore={currentStore}  cartItems={cartItems} />
            </StickyBox>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(firestoreConnect((currentStore, auth) => query(currentStore, auth))(CartDashboard));
