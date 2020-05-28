import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import StickyBox from "react-sticky-box";
import OrderSummary from "../OrderSummary/OrderSummary";
import CartList from "../CartList/CartList";
import { getCart } from "../cartActions";
import { Helmet } from "react-helmet";

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  user: state.firestore.data.user,
  symbol: state.collection.symbol,
  cartItems: state.cart.cart,
  store: state.firestore.data.selectedStore,
});

const actions = { getCart };

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
  /*async componentWillMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`/Stores/${match.params.store}/Buyers/${this.props.auth.uid}`);
    //this.props.firebase.watchEvent('value', `/Stores/${match.params.store}/Buyers/${this.props.auth.uid}`)
  }*/

  render() {
    const {
      user,
      symbol,
      currentStore,
      cartItems,
      getCart,
      store,
      loading,
    } = this.props;

    if (user) {
      getCart(user);
    }

    if (!cartItems) return <LoadingComponent inverted={true} />;

    return (
      <>
        {store && (
          <Helmet>
            <title>My Bag | {store.storeName}</title>
          </Helmet>
        )}
        <Grid divided="vertically" doubling stackable columns={2}>
          <Grid.Row>
            <Header as="h3">My Bag</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <CartList
                currentStore={currentStore}
                symbol={symbol}
                cartItems={cartItems}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              {cartItems && cartItems.length > 0 && (
                <StickyBox offsetTop={70} offsetBottom={20}>
                  <OrderSummary
                    symbol={symbol}
                    currentStore={currentStore}
                    cartItems={cartItems}
                  />
                </StickyBox>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect((currentStore, auth) => query(currentStore, auth))(
    CartDashboard
  )
);
