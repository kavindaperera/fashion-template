import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import PropTypes from "prop-types";
import ResponsiveGallery from "react-responsive-gallery";
import { Helmet } from "react-helmet";
import "./LookBook.css";

const mapState = (state, ownProps) => ({
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  products: state.firestore.ordered.items,
  store: state.firestore.ordered.selectedStore,
});

const actions = {};

function shuffle(arra1) {
  var ctr = arra1.length,
    temp,
    index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

class LookBook extends Component {
  constructor(props) {
    super(props);
    this.state = { photos: [], numOfCols: 3 };
  }

  componentWillReceiveProps() {
    this.setState({ photos: [] });
  }

  render() {
    const { loading, products, store } = this.props;

    if (isLoaded(products)) {
      products.forEach((product) => {
        if (product.photos && product.photos[0] && !product.deleted && product.visible) {
          let px = { src: product.photos[0].url };
          this.state.photos.push(px);
        }
        if (product.photos && product.photos[1] && !product.deleted && product.visible) {
          let px = { src: product.photos[1].thumbnail };
          this.state.photos.push(px);
        }
        //shuffle(this.state.photos)
      });
    }

    return (
      <div>
        <Helmet>
          <title>Look Book </title>
        </Helmet>
        {/*<div className='lookbook' ></div>*/}
        <ResponsiveGallery
          className="lookbook-images"
          numOfImagesPerRow={{ xs: 6, s: 4, m: 2, l: 1, xl: 4, xxl: 5 }}
          images={this.state.photos}
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
