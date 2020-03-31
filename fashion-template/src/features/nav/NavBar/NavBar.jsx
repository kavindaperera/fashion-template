import React, { Component } from "react";
import {connect} from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Dropdown} from "semantic-ui-react";
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
            <img  src={"/company.png"} alt="logo" />
          </Menu.Item>
          <Menu.Menu position='right' >
          <Menu.Item name='New' as={NavLink} to="/collection"></Menu.Item>
          <Menu.Item  name='Men' as={Link} to="/"></Menu.Item>
          <Menu.Item  name='Women' as={Link} to="/"></Menu.Item>
          <Menu.Item  name='Brands' as={Link} to="/"></Menu.Item>
          <Dropdown item simple text='Category'>
          <Dropdown.Menu>
            <Dropdown.Item>SubCategory</Dropdown.Item>
            <Dropdown.Item>SubCategory</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>SubCategory</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></Menu.Menu>
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
