import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchStandard from './SearchStandard'
import { firestoreConnect } from "react-redux-firebase";

const mapState = (state, ownProps) => ({
  currentStore: ownProps.match.params.store,
  items: state.firestore.ordered.items,
});


const query = ({ currentStore }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items" }],
      storeAs: "items",
    },
  ];
};


class TestComponent extends Component {


  render() {

    const { items, currentStore } = this.props;
      return (
        <div className="main">
          <SearchStandard items={items} currentStore={currentStore}/>
        </div>
      );
  }
}

export default connect(
  mapState,
  null
)(
  firestoreConnect((currentStore) => query(currentStore))(
    (TestComponent)
  )
);