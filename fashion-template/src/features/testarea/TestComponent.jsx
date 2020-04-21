import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { openModal } from '../modals/modalActions'
import ChatButton  from '../button/ChatButton';

const mapState = state => ({
  
});

const actions = {
  openModal
};

// const Marker = () => <Icon name='marker' size='big' color='red'/>

class TestComponent extends Component {

  render() {

    const { openModal, } = this.props;
    return (
      <div>
        <Button onClick={() => openModal('TestModal', {data: 42})} color="teal" content="Open Modal" />
        <br />
        <br />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
