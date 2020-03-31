import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Menu, Dropdown, Item, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import StickyBox from "react-sticky-box";

const mapState = state => ({
  cart: state.firestore.ordered.cart,
  loading: state.async.loading
});

const actions = {};

class CartDashboard extends Component {
  render() {
    const { cart, loading } = this.props;

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <h5>{cart && cart.length} items</h5>
        <Item.Group divided>
          {cart &&
            cart.map(product => (
              <Item>
                <Item.Image size="small" src={product.photoURL} />
                <Item.Content>
                  <h4 as="a">{product.productName}</h4>
                  <h5>{product.quantity}</h5>
                  <h5>
                    <del style={{ color: "grey" }}>${product.price} {" "}</del>
                    <a style={{ color: "red" }}>${product.price - (product.price * product.discount) / 100}{" "}
                    </a>
                  </h5>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
        <h1> </h1>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "cart" }])(CartDashboard));
