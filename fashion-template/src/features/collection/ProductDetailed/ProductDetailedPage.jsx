import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'
import { withFirestore } from 'react-redux-firebase'
import { Grid } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import ProductDetailedPhotoSlide from "./ProductDetailedPhotoSlide";
import ProductPriceDetails from "./ProductPriceDetails";
import StickyBox from "react-sticky-box";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getStore } from '../../store/storeActions'
const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  const products = state.firestore.ordered.items;
  const currentStore = ownProps.match.params.store;
  const store = state.firestore.data.selectedStore;

  let product = {};

  if (productId && products) {
    product = products.filter(product => product.id === productId)[0];
  }
  return {
    product,
    products,
    currentStore,
    store
  };
};

const actions = {};

const query = ({currentStore}) => {
  return [
    {
      collection:'Stores',
      doc: currentStore,
      subcollections:[{collection: 'Items'}],
      storeAs: 'items'
    }
  ]
}


class ProductDetailedPage extends Component {


  async componentDidMount(){
    const {firestore, match,} = this.props;
    await firestore.setListener(`collection/products/${match.params.id}`);
  }
  render(){

  const {product, store} = this.props;
  console.log('detailed',store);
  console.log('detailed',product)

  if (!product.name) return <LoadingComponent inverted={true} />;

  return (
    <Grid>
      <Grid.Column width={8}>
        <div>
          <ProductDetailedPhotoSlide product={product} />
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
        <StickyBox offsetTop={70} offsetBottom={20}>
        {store && 
          <ProductPriceDetails currency={store.currency.symbol} product={product} />}
        </StickyBox>
      </Grid.Column>
    </Grid>
  );
}};

export default withFirestore(connect(mapState,actions)(firestoreConnect(currentStore => query(currentStore))(ProductDetailedPage)));
