import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from "semantic-ui-react";
import ProductList from '../ProductList/ProductList'
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = (state) => ({
  products: state.firestore.ordered.products,
  loading: state.async.loading
})

const actions = {
  
}

class CollectionDashboard extends Component {

  render() {
    const {products,loading} = this.props;
    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <div>

        <Grid stackable >
        <Grid.Column width={2}>
            <h1>Shop Menu</h1>
        </Grid.Column>
          <Grid.Column width={14}>
            <ProductList
              products={products}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(mapState, actions)(
  firestoreConnect([{collection: 'products'}])(CollectionDashboard)
);
