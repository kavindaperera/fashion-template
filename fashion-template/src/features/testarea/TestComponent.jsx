import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkout from '../paypal/checkout'

const mapState = state => ({
  
});

const actions = {
};

class TestComponent extends Component {


  render() {

      return (
        <div className="main">
          <Checkout/>
        </div>
      );
  }
}

export default connect(mapState, actions)(TestComponent);
