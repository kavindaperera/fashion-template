import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import { withFirestore } from "react-redux-firebase";
import { Grid, Button,Breadcrumb, Image } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import ProductDetailedPhotoSlide from "./ProductDetailedPhotoSlide";
import ProductPriceDetails from "./ProductPriceDetails";
import StickyBox from "react-sticky-box";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import moment from "moment";
import { NavLink, Link } from "react-router-dom";
import _ from "lodash";
import ProductComments from "./ProductComments";
import ProductNotFound  from '../../pages/ProductNotFound'

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  const products = state.firestore.ordered.items;
  const currentStore = ownProps.match.params.store;
  const store = state.firestore.data.selectedStore;
  const config = state.firestore.data.config;

  let product = {};

  if (productId && products) {
    product = products.filter((product) => product.id === productId)[0];
  }
  /*if(state.firestore.ordered.items && state.firestore.ordered.items[0]) {

    product = state.firestore.ordered.items.filter((product) => product.id === productId)[0];
  }*/


  return {
    product,
    products,
    currentStore,
    store,
    config,
  };
};

const actions = {};

const query = ({ currentStore }) => {
  return [
    /*{
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items" }],
      s*oreAs: "items",
    },*/
  ];
};

class ProductDetailedPage extends Component {

  /*async componentDidMount() {
    const { firestore, match } = this.props;
    //let product =  await firestore.get(`Stores/${match.params.store}/items/${match.params.id}`);
    //console.log(product)
    await firestore.setListener(`Stores/${match.params.store}/Items`);
  }*/

/*
  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`Stores/${match.params.store}/items`);
  }*/

  render() {
    const { product, currentStore, store} = this.props;
    let discountActive = false;
    let discount = 0;
    let reviews = null;
    let enableRating = false;


    if (product && !product.name && product.deleted) {return <LoadingComponent inverted={true} />} ;

    //checking Discount Status
    if (product && product.discount != null) {
      const dateNow = moment().format("X");
      const startDate = product.discount.startDate.seconds;
      const endDate = product.discount.endDate.seconds;
      discountActive = startDate < dateNow && dateNow < endDate;
      discount = product.discount.percentage;
    }

    let currentCategory = ""

    if(product && store){
    const categories = store.categories;
    const currentCategoryIndex = product.category;
    const sortCategoryIndex = categories.map((category, index) =>  { if(index==currentCategoryIndex){ return category.name; } } )
    currentCategory= sortCategoryIndex.sort()[0]
    enableRating = store.enableRating;
    //console.log(JSON.stringify(product, null, 2))
    }

    if (product){
      reviews = (product.reviews)
    }




    return (
      <div>{product && !product.deleted &&
      <Grid>
      <Grid.Row>
        <Breadcrumb>
          <Breadcrumb.Section title="Back to Cothing" style={{color:'grey'}} as={Link} to={`/${currentStore}/collection/all`}>Clothing</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron'/>
          <Breadcrumb.Section title={`Back to ${_.capitalize(currentCategory)}`} style={{color:'grey'}}  as={Link} to={`/${currentStore}/collection/${currentCategory}`}>{_.capitalize(currentCategory)}</Breadcrumb.Section>
          <Breadcrumb.Divider style={{color:'grey'}} icon='right chevron'/>
          <Breadcrumb.Section >{product.name}</Breadcrumb.Section>
        </Breadcrumb>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <div>
            <ProductDetailedPhotoSlide product={product} />
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <StickyBox offsetTop={70} offsetBottom={30}>
            {store && product && (
              <div>
              <ProductPriceDetails
                currentStore={currentStore}
                product={product}
                discountActive={discountActive}
                discount={discount}
                reviews={reviews}
              />
              {enableRating && <ProductComments reviews={reviews}/>}
              </div>
            )}
          </StickyBox>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{marginTop:'8rem' , marginBottom:'6rem'}} >
        <Grid.Column textAlign='center'>
              <Grid.Row ><h3 style={{ color:'grey', marginBottom:'1rem'}} >Shop More</h3></Grid.Row>
              <Grid.Row >
          {store && store.categories &&
            store.categories.map((category) => (
              <Button basic
              className='detailed-page'
                as={NavLink}
                to={`/${currentStore}/collection/${category.name}`}
                size="large"
                color="grey"
                key={category.name}
              >
                {_.startCase(category.name)}
              </Button>
            ))}</Grid.Row>

            </Grid.Column>
        </Grid.Row>
      </Grid> }
      {(!product) && <ProductNotFound currentStore={currentStore} />}
      { product && product.deleted &&  <ProductNotFound currentStore={currentStore} /> }
      </div>
    );
  }
}

//export default compose( withFirestore, connect(mapState, actions), firestoreConnect((currentStore) => query(currentStore)))(ProductDetailedPage);

export default withFirestore(connect(mapState,actions)(firestoreConnect((currentStore) => query(currentStore))(ProductDetailedPage)));
