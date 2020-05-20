import React from 'react';
import { Modal } from 'semantic-ui-react';
import { closeModal } from './modalActions'
import { connect } from 'react-redux'
import ReviewForm from '../review/ReviewForm'

const actions = {
  closeModal
}

const mapState = (state, ownProps) => ({
  data: state.modals.modalProps,
});

const ReviewModel = ({closeModal, data}) => {
  
  return (
    <Modal size='mini' closeIcon="close" open={true} onClose={closeModal}>
      <Modal.Header>Leave Review</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <ReviewForm data={data} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default connect(mapState, actions)(ReviewModel);
