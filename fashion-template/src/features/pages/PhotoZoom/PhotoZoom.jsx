import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from "lodash";
import "../NotFound/NotFound.css";
import "./PhotoZoom.css";
import { Carousel } from "react-responsive-carousel";
import { Image, Button } from "semantic-ui-react";

class PhotoZoom extends Component {
  render() {
    const { photos } = this.props;
    return (
      <body id="zoom">
        {/*<Button onClick={this.props.handleCloseClick}>Close</Button>*/}
        <a onClick={this.props.handleCloseClick} class="close-button">Close</a>
        {photos &&
          photos.map((photo, i) => (
            /*<LazyImage key={i} style={{marginBottom:'3rem'}} fluid src={photo.url} thumb={photo.thumbnail}/>*/
            <Image
              key={i}
              style={{ marginBottom: "3rem" }}
              fluid
              src={photo.url}
            />
          ))}
      </body>
    );
  }
}

export default PhotoZoom;
