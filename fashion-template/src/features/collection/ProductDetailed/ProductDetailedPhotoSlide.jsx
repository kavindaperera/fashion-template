import React, { Component } from "react";
import {
  Image,
  Grid,
} from "semantic-ui-react";
import PhotoZoom from '../../pages/PhotoZoom/PhotoZoom'

//import { Carousel } from "react-responsive-carousel";


class ProductDetailedPhotoSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom: false
    };
  }

  handleZoomClick = () => this.setState({ zoom: true});

  handleCloseClick = () => this.setState({ zoom: false});

  render() {

    const{product} = this.props


    if (this.state.zoom==true){
      return (
          <div>
              {product.photos && <PhotoZoom handleCloseClick={this.handleCloseClick}  photos={product.photos}/>}
          </div>
  );
  }

  return (
    <div>
      <Grid>
        <Grid.Column className='zoom-in' >
        {/*<Carousel swipeable={true} showThumbs= {false} showStatus={false} centerMode centerSlidePercentage={100}>
        {product.photos &&
            product.photos.map((photo,i) => (
              <Image key={i} fluid src={photo.url} />
            ))}
                    </Carousel>*/}
                    {/*product.photos && console.log( JSON.stringify(product.photos, null, 2))*/}

                    {product.photos &&
            product.photos.map((photo,i) => (
              /*<LazyImage key={i} style={{marginBottom:'3rem'}} fluid src={photo.url} thumb={photo.thumbnail}/>*/
              <Image onClick={this.handleZoomClick} key={i} style={{marginBottom:'3rem'}} fluid src={photo.url} />
            ))}
        </Grid.Column>
      </Grid>
    </div>
  );
            }
};

export default ProductDetailedPhotoSlide;
