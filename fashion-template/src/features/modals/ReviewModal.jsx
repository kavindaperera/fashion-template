import React from 'react';
import { Modal } from 'semantic-ui-react';
import { closeModal } from './modalActions'
import { connect } from 'react-redux'
import ReviewForm from '../review/ReviewForm'

const actions = {
  closeModal
}

const mapState = (state, ownProps) => ({
  store: state.modals.modalProps,
});

const ReviewModel = ({closeModal, store}) => {
  console.log(store)
  return (
    <Modal size='mini' closeIcon="close" open={true} onClose={closeModal}>
      <Modal.Header>Leave Review</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <ReviewForm/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default connect(mapState, actions)(ReviewModel);
