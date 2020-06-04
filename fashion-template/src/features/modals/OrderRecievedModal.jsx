import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";
import { confirmOrderRecieved } from "../orders/ordersAction";

const actions = {
  closeModal,
  confirmOrderRecieved,
};

const mapState = (state, ownProps) => ({
  data: state.modals.modalProps,
});

class OrderRecievedModal extends Component {

    onConfirm = e => {
        if (this.props.data){
            const currentStore = this.props.data.currentStore;
            const orderId = this.props.data.orderId;
            this.props.confirmOrderRecieved(orderId, currentStore)
        }
    }
  render() {

    const { closeModal, data } = this.props;

    return (
      <Modal size="mini" closeIcon="close" open={true} onClose={closeModal}>
        <Modal.Header>Confirm</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Are you sure you want to confirm? This cannot be undone.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} color="black">
            Disagree
          </Button>
          <Button
            color="white"
            onClick={this.onConfirm }
            content="Agree"
            loading={data.loading}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapState, actions)(OrderRecievedModal);
