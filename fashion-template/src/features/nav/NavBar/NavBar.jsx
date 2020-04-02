import React, { Component } from "react";
import {connect} from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Dropdown,Visibility,} from "semantic-ui-react";
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

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #fff',
}

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

  state = {
    menuFixed: false,
    overlayFixed: false,
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })


  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const { menuFixed } = this.state
    return (

<Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >

      <Menu 
      borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}>
        <Container fluid className="nav">
          <Menu.Item as={Link} to="/" header>
            <img  src={"/company.png"} alt="logo" />
          </Menu.Item>
          <Menu.Menu position='right' >
          <Menu.Item name='New' as={NavLink} to="/collection"></Menu.Item>
          <Menu.Item  name='Men' as={Link} to="/men"></Menu.Item>
          <Menu.Item  name='Women' as={Link} to="/women"></Menu.Item>
          <Menu.Item  name='Brands' as={Link} to="/brands" ></Menu.Item>
          <Dropdown item simple as={Link} to="/" text='Categories'>
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
      </Menu></Visibility>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
