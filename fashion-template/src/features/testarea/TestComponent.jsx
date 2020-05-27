import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect , isLoaded, isEmpty } from "react-redux-firebase";
import PropTypes from 'prop-types';
import ResponsiveGallery from 'react-responsive-gallery';

const mapState = (state, ownProps) => ({
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  products: state.firestore.ordered.items,
});

const actions = {};


class TestComponent extends Component {
  constructor(props) {
		super(props);
		this.state = { photos: [], numOfCols: 3 };
  }
  
  componentWillReceiveProps(){
    this.setState({photos:[]})
  }

    render() {
      const { loading, products } = this.props;


      if( isLoaded(products)) {
        products.forEach(product => {
            let px = {
              src: product.photos[0].url }
            this.state.photos.push(px)
          })
      }

      return(
                <div>
                     <ResponsiveGallery className='lookbook' numOfImagesPerRow={{xs: 1,s: 2,m: 3,l: 3,xl: 4, xxl:5}} images={this.state.photos}/>
                </div>
        );
    }
};

TestComponent.propTypes = {
      photos: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.number.isRequired,
  })),
  numOfCols: PropTypes.number
};

export default connect(
  mapState,
  actions
)(TestComponent);