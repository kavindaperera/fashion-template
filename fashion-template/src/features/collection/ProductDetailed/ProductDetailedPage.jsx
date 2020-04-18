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
import moment from 'moment';

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  const products = state.firestore.ordered.items;
  const currentStore = ownProps.match.params.store;
  const store = state.firestore.data.selectedStore;
  const config = state.firestore.data.config;

  let product = {};

  if (productId && products) {
    product = products.filter(product => product.id === productId)[0];
  }
  return {
    product,
    products,
    currentStore,
    store,
    config,
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
    const {firestore, match} = this.props;
    await firestore.setListener(`collection/products/${match.params.id}`);
  }


  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`collection/products/${match.params.id}`);
  }

  render(){

  const {product, currentStore, store, config} = this.props;
  let discountActive = false;
  let discount = 0;  
  

  if (!product.name) return <LoadingComponent inverted={true} />;

  
   //checking Discount Status
   if(product.discount!=null){
    const dateNow = moment().format('X');
    const startDate = product.discount.startDate.seconds;
    const endDate = product.discount.endDate.seconds;
    discountActive = (startDate < dateNow && dateNow < endDate)
    discount = product.discount.percentage
    }

 

  return (
    <Grid>
      <Grid.Column width={8}>
        <div>
          <ProductDetailedPhotoSlide product={product} />
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
        <StickyBox offsetTop={70} offsetBottom={30}>
        { store && product &&
          <ProductPriceDetails currentStore={currentStore}  product={product} discountActive={discountActive}  discount={discount}/>}
        </StickyBox>
      </Grid.Column>
    </Grid>
  );
}};

export default withFirestore(connect(mapState,actions)(firestoreConnect(currentStore => query(currentStore))(ProductDetailedPage)));
