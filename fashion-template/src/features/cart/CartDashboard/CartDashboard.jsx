import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { queryAllByAltText } from "@testing-library/react";

const mapState = state => ({
  auth : state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading,
  user: state.firebase.profile,
  cart: state.firestore.ordered.cart
});

const query = ({auth}) => {
  return [
    {
      collection:'users',
      doc: auth.uid,
      subcollections:[{collection: 'storeCarts'}],
      storeAs: 'cart'
    }
  ]
}

const actions = {};

class CartDashboard extends Component {
  
  render() {
    const { auth, user,  cart, loading } = this.props;
    

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Item.Group divided>
          {cart &&
            cart.map(c => ( c.state == 'inCart' &&
              <Item>
                <Item.Image size="small" src={c.order.photoURL} />
                <Item.Content>
                  <h4 as="a">{c.order.productName}</h4>
                  <h5>{c.order.quantity}</h5>
                  <h5>
                    <del style={{ color: "grey" }}>${c.order.price} </del>
                    <a style={{ color: "red" }}>${c.order.price - (c.order.price * c.order.discount) / 100}{" "}</a>
                  </h5>
                  <Item.Extra>
                    <Button color='black' circular floated='right' icon='trash alternate outline' />
                  </Item.Extra>
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
)(firestoreConnect(auth => query(auth))(CartDashboard));
