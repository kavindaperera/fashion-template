import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ProductDetailedPhotoSlide from "./ProductDetailedPhotoSlide";
import ProductPriceDetails from "./ProductPriceDetails";
import StickyBox from "react-sticky-box";

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  //const products = state.firestore.ordered.products;
  const products = state.products;

  let product = {};

  if (productId && products) {
    product = products.filter(product => product.id === productId)[0];
  }
  return {
    product
  };
};

const ProductDetailedPage = ({ product}) => {
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
};

export default connect(mapState)(ProductDetailedPage);
