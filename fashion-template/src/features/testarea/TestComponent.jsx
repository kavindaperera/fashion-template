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
  }


    render() {
      const { loading, products } = this.props;

      return(
                <div>

                </div>
        );
    }
};

/*
TestComponent.propTypes = {
      photos: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.number.isRequired,
  })),
  numOfCols: PropTypes.number
};*/

export default connect(
  mapState,
  actions
)(TestComponent);