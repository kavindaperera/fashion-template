import React from "react";
import {
  Image,
  Grid,
} from "semantic-ui-react";
import LazyImage from "../../lazyImage/LazyImage";
//import { Carousel } from "react-responsive-carousel";


const ProductDetailedPhotoSlide = ({ product }) => {
  return (
    <div>
      <Grid >
        <Grid.Column >
        {/*<Carousel swipeable={true} showThumbs= {false} showStatus={false} centerMode centerSlidePercentage={100}>
        {product.photos &&
            product.photos.map((photo,i) => (
              <Image key={i} fluid src={photo.url} />
            ))}
                    </Carousel>*/}
                    {product.photos &&
            product.photos.map((photo,i) => (
              /*<LazyImage key={i} style={{marginBottom:'3rem'}} fluid src={photo.url} thumb={photo.thumbnail}/>*/
              <Image key={i} style={{marginBottom:'3rem'}} fluid src={photo.url} />
            ))}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProductDetailedPhotoSlide;
