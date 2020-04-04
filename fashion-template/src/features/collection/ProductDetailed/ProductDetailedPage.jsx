import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from 'react-redux-firebase'
import { Grid } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import ProductDetailedPhotoSlide from "./ProductDetailedPhotoSlide";
import ProductPriceDetails from "./ProductPriceDetails";
import StickyBox from "react-sticky-box";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  const products = state.firestore.ordered.items;
  const currentStore = ownProps.match.params.store;

  let product = {};

  if (productId && products) {
    product = products.filter(product => product.id === productId)[0];
  }
  return {
    product,
    currentStore
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


  async componentDidMount(){
    const {firestore, match} = this.props;
    await firestore.setListener(`collection/products/${match.params.id}`);
  }
  render(){

  const {product} = this.props;

  if (!product) return <LoadingComponent inverted={true} />;

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

export default withFirestore(connect(mapState)(firestoreConnect(currentStore => query(currentStore))(ProductDetailedPage)));
