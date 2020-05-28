import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import PropTypes from "prop-types";
import ResponsiveGallery from "react-responsive-gallery";
import { Helmet } from "react-helmet";
import "./LookBook.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const mapState = (state, ownProps) => ({
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  products: state.firestore.ordered.items,
  store: state.firestore.ordered.selectedStore,
});

const actions = {};


class LookBook extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      photos: [],
      numOfCols: 3,
      photoIndex: 0,
      isOpen: false, 
    };
  }

  componentWillReceiveProps() {
    this.setState({ photos: [] });
  }

  render() {
    const { loading, products, store } = this.props;
    const { photoIndex, isOpen } = this.state;

    if (isLoaded(products)) {
      products.forEach((product) => {
        if (product.photos && product.photos[0] && !product.deleted && product.visible) {
          let px = { src: product.photos[0].url };
          this.state.photos.push(px);
        }
        if (product.photos && product.photos[1] && !product.deleted && product.visible) {
          let px = { src: product.photos[1].url };
          this.state.photos.push(px);
        }
        if (product.photos && product.photos[2] && !product.deleted && product.visible) {
          let px = { src: product.photos[2].url };
          this.state.photos.push(px);
        }

        //setTimeout(shuffle(this.state.photos), 3000);

      });
    }

    return (
      <div>
        <Helmet>
          <title>Look Book </title>
        </Helmet>
        {/*<div className='lookbook' ></div>*/}
        <div>
 
        {isOpen && (
          <Lightbox
            mainSrc={this.state.photos[photoIndex]}
            nextSrc={this.state.photos[(photoIndex + 1) % this.state.photos.length]}
            prevSrc={this.state.photos[(photoIndex + this.state.photos.length - 1) % this.state.photos.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.state.photos.length - 1) % this.state.photos.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.state.photos.length,
              })
            }
          />
        )}
      </div>
        <ResponsiveGallery
          className="lookbook-images"
          numOfImagesPerRow={{xs: 1,s: 2,m: 3,l: 3,xl: 4,xxl:5}}
          screenWidthSizes={{xs: 420,s: 600,m: 768,l: 992,xl: 1200}}
          images={this.state.photos.slice(0, Math.floor(Math.random() * (this.state.photos.length)) ) }    //Math.floor(Math.random() * 10); 
          orderL
          useLightBox={true}
        />

        <br />
      </div>
    );
  }
}

LookBook.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.number.isRequired,
    })
  ),
  numOfCols: PropTypes.number,
};

export default connect(mapState, actions)(LookBook);
