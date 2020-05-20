import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { openModal } from '../modals/modalActions'

const mapState = (state, ownProps) => ({
  currentStore: ownProps.match.params.store,
});

const actions = {
  openModal,
};



class TestComponent extends Component {


  render() {

    const {  openModal, currentStore} = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <Button onClick={() => openModal('ReviewModal', {currentstore: currentStore})} color="teal" content="Open Modal" />
        <br />
        <br />

      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
