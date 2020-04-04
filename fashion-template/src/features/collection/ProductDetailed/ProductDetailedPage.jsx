import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import ProductDetailedPhotoSlide from "./ProductDetailedPhotoSlide";
import ProductPriceDetails from "./ProductPriceDetails";
import StickyBox from "react-sticky-box";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  //const products = state.firestore.ordered.products;
  const products = state.firestore.ordered.items;
  const currentStore = state.store.currentStore;

  let product = {};

  if (productId && products) {
    product = products.filter(product => product.id === productId)[0];
  }
  return {
    product,
    currentStore,
    requesting: state.firestore.status.requesting
  };
};


const query = ({currentStore}) => {
  return [
    {
      collection:'store',
      doc: currentStore,
      subcollections:[{collection: 'items'}],
      storeAs: 'items'
    }
  ]
}

class ProductDetailedPage extends Component {
  render(){

  const {product, requesting} = this.props;
  const loading = Object.values(requesting).some(a => a===true)
  console.log('loading', requesting);

  if (loading) return <LoadingComponent inverted={true} />;

  return (
    <Grid>
      <Grid.Column width={8}>
        <div>
          <ProductDetailedPhotoSlide product={product} />
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
        <StickyBox offsetTop={70} offsetBottom={20}>
          <ProductPriceDetails product={product} />
        </StickyBox>
      </Grid.Column>
    </Grid>
  );
}};

export default connect(mapState)(firestoreConnect(currentStore => query(currentStore))(ProductDetailedPage));
