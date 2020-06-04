import React, { Component } from "react";
import { Image, Grid } from "semantic-ui-react";
import PhotoZoom from "../../pages/PhotoZoom/PhotoZoom";
import { Carousel } from "react-responsive-carousel";

class ProductDetailedPhotoSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: false,
    };
  }

  handleZoomClick = () => this.setState({ zoom: true });

  handleCloseClick = () => this.setState({ zoom: false });

  render() {
    const { product } = this.props;

    if (this.state.zoom == true) {
      return (
        <div>
          {product.photos && (
            <PhotoZoom
              handleCloseClick={this.handleCloseClick}
              photos={product.photos}
            />
          )}
        </div>
      );
    }

    return (
      <div>
        <Grid>
          <Grid.Column className="zoom-in">
            <div  onClick={this.handleZoomClick}  className="carousel-detailed">
              <Carousel 
                className="carousel-detailed-hide"
                autoPlay={true}
                infiniteLoop={true}
                //stopOnHover={true}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                centerMode
                centerSlidePercentage={100}
              >
                {product.photos &&
                  product.photos.map((photo, i) => (
                    <Image  key={i} fluid src={photo.url} />
                  ))}
              </Carousel>
            </div>
            {/*product.photos && console.log( JSON.stringify(product.photos, null, 2))*/}

            {product.photos &&
              product.photos.map((photo, i) => (
                /*<LazyImage key={i} style={{marginBottom:'3rem'}} fluid src={photo.url} thumb={photo.thumbnail}/>*/
                <Image
                  className="photo-detailed-hide"
                  onClick={this.handleZoomClick}
                  key={i}
                  style={{ marginBottom: "3rem" }}
                  fluid
                  src={photo.url}
                />
              ))}

            {product.photos && !product.photos[0] && (
              <Image
                className="photo-detailed-hide"
                onClick={this.handleZoomClick}
                style={{ marginBottom: "3rem" }}
                fluid
                src={"/assets/product_list_image.png"}
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ProductDetailedPhotoSlide;
