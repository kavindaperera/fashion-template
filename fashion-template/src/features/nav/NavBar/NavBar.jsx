import React, { Component } from "react";
import {connect} from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from '../../modals/modalActions'

const actions = {
  openModal
};

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {

  handleSignedIn = () => {
    this.props.openModal('LoginModal')
  };

  handleSignedOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu fixed="top">
        <Container fluid className="nav">
          <Menu.Item as={Link} to="/" header>
            <img size = 'large' src="https://www.aritzia.com/on/demandware.static/Sites-Aritzia_INTL-Site/-/default/dw3a862a2a/images/aritzia_skin/aritzia_logo.svg" alt="logo" />
          </Menu.Item>
        
          {authenticated ? (
            <SignedInMenu profile={profile} signOut={this.handleSignedOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignedIn} register={this.handleRegister} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
