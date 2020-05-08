import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Table,} from "semantic-ui-react";
import CartListItem from "./CartListItem";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => ({
  mainItems: state.firestore.ordered.items,
  loading: state.async.loading
});

const actions = {};

const query = ({ currentStore,item }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items"}],
      storeAs: "items",
    },
  ];
};

class CartList extends Component {
  render() {
      const {symbol, cartItems, currentStore,mainItems,loading} = this.props

      if (loading) return <LoadingComponent inverted={true} />;


    return (
      <div>
        <Table basic="very"  collapsing>
          <Table.Body>
          {/*cartItems && cartItems.length==0 && <LoadingComponent inverted={true} />*/}
          {cartItems && cartItems.map((item,i)=> (
            <CartListItem key={i} item={item} mainItems={mainItems} symbol={symbol} currentStore={currentStore} index={i}/>
          ))}
          {cartItems && cartItems.length==0 && (
            <Table.Row>
                <Table.Cell width={3} textAlign='left' verticalAlign='top'>
                  You haven't put any items in your bag.
                  <br></br>
                  <a href={`/${currentStore}/collection/all`}>Start Shopping</a>
                </Table.Cell>
              </Table.Row>
          )}

          </Table.Body>
        </Table>
      </div>
    );
  }
}


export default connect(
  mapState,
  actions
)(
  firestoreConnect((currentStore, item) => query(currentStore, item))(
    CartList
  )
);
