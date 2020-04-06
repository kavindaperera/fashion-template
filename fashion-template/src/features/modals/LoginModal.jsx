import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';
import LoginForm from '../auth/Login/LoginForm';
import {closeModal} from "./modalActions";
import { firestoreConnect } from 'react-redux-firebase';

const actions = {closeModal};

const mapState = (state) => ({
    store: state.firestore.data.selectedStore,
  });
class LoginModal extends Component {
    render() {
        const {store} = this.props;
        console.log(store.storeId)

        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}>
                <Modal.Header>
                    Login
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm currentStore={store.storeId} />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(mapState, actions)(firestoreConnect()(LoginModal));