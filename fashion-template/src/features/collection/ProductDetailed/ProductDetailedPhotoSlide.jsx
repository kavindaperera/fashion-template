import React from "react";
import {
  Image,
  Grid,
} from "semantic-ui-react";



const ProductDetailedPhotoSlide = ({ product }) => {
  return (
    <div>
      <Grid >
        <Grid.Column >
          {product.photos &&
            product.photos.map(photo => (
              <div><Image key={photo} src={photo} /></div>
              
            ))}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProductDetailedPhotoSlide;
