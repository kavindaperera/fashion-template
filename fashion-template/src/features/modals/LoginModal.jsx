import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';
import LoginForm from '../auth/Login/LoginForm';
import {closeModal} from "./modalActions";
import { firestoreConnect } from 'react-redux-firebase';

const actions = {closeModal};

const mapState = (state, ownProps) => ({
    store: state.modals.modalProps,
  });
class LoginModal extends Component {
    render() {
        const {store} = this.props;
        console.log(store)

        return (
            <Modal
                size='mini'
                centered
                open={true}
                onClose={this.props.closeModal}>
                <Modal.Header >
                    Login
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description style={{marginTop:'2rem', marginBottom:'2rem', marginLeft:'2rem', marginRight:'2rem'}}>
                        <LoginForm currentStore={store} />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(mapState, actions)(firestoreConnect()(LoginModal));