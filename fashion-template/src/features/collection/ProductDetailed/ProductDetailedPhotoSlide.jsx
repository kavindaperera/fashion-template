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
            product.photos.map((photo,i) => (
              <div key={i} ><Image fluid src={photo.url} /></div>
            ))}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProductDetailedPhotoSlide;
