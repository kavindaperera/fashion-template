import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {  Button} from "semantic-ui-react";
import PropTypes from "prop-types";
import ResponsiveGallery from "react-responsive-gallery";
import { Helmet } from "react-helmet";
import "./LookBook.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import LoadingComponent from "../../../app/layout/LoadingComponent";

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
      start: 1,
      end:11
    };
  }

  componentWillReceiveProps(){
    this.setState({photos: []})
  }


  handleNext= e => {
    this.setState({photos: []})
    if (this.state.end<=this.state.photos.length){
      //console.log(this.state.start, this.state.end)
      this.setState({start: this.state.start + 10, end: this.state.end + 10})
  }


  };

  handleReset = e => {
    this.setState({photos: []})
    //console.log(this.state.start, this.state.end)
    if (this.state.start>1){
      console.log(this.state.start, this.state.end)
      this.setState({start: this.state.start - 10, end: this.state.end - 10})
  }
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
      });
    }
    //console.log(this.state.photos)


    return (
      <div>
        <Helmet>
          <title>Look Book </title>
        </Helmet>
        {/*<div className='lookbook' ></div>*/}
        <div>
        <div className='lb-btn-grp' >
        <Button className='lb-prv' onClick={this.handleReset}>Back</Button>
        <Button className='lb-nxt' onClick={this.handleNext}>Next</Button></div>


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
          images={this.state.photos.slice(this.state.start, this.state.end) }    //Math.floor(Math.random() * 10); 
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
