import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import "../NotFound/NotFound.css";

const ProductNotFound = ({currentStore}) => {
  return (
    <div className='notfound'>
      <Grid style={{ marginBottom: '30%'}} centered>
        <Grid.Column>
          <p>Sorry, this product isn’t available.</p>
          <p>The link you followed may be broken or the product may have been removed.</p>
          <a href={`/${currentStore}/`}>Go Home</a>
          <br></br>
          <br></br>
          <a href={`/${currentStore}/collection/all`}>Continue Shopping</a>
          <br></br>
          <br></br>
          <br></br>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProductNotFound;
