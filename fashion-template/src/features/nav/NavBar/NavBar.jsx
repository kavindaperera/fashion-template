import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  Menu,
  Container,
  Dropdown,
  Visibility,
  Image,
} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import "../../../index.css";


const actions = {
  openModal
};

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  store: state.firestore.data.selectedStore,
  currentStore: ownProps.match.params.store,
  params: ownProps.match.params
});

const query = ({currentStore}) => {
  return [
    {
      collection:'Stores',
      doc: currentStore,
      storeAs: 'selectedStore'
    }
  ]
}

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "4em",
  transition: "box-shadow s ease, padding 0.5s ease",
  backgroundColor: "#fff",
};

const fixedMenuStyle = {
  backgroundColor: "#fdfdfd",
  border: "1px solid #fff",
};

class NavBar extends Component {

  handleSignedIn = () => {
    this.props.openModal("LoginModal");
  };

  handleSignedOut = () => {
    this.props.firebase.logout();    
    console.log('signingout from:',this.props.currentStore)
    this.props.history.push(`/${this.props.currentStore}/`);
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { auth, profile, store,  currentStore,} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const { menuFixed } = this.state;

    return (
      <div>
        {store &&
                <div>
                  <Container as={Link} to={`/${currentStore}/`}  style={{ marginTop: "2em" }}>
                    <Image
                      alt="a"
                      src={store.storeCustomization.logo}
                      size="small"
                      centered
                    />
                  </Container>

                  <Visibility
                    onBottomPassed={this.stickTopMenu}
                    onBottomVisible={this.unStickTopMenu}
                    once={false}
                  >
                    <Menu
                      borderless
                      fixed={menuFixed ? "top" : undefined}
                      style={menuFixed ? fixedMenuStyle : menuStyle}
                    >
                      <Container fluid className="nav">
                        <Menu.Item as={Link} to={`/${currentStore}/`} header>
                          <Image  size="tiny" src={store.storeCustomization.logo} alt="a"/>
                        </Menu.Item>
                        <Menu.Menu position="right">
                          <Menu.Item
                            name="All"
                            as={NavLink}
                            to={`/${currentStore}/collection/all`} 
                          ></Menu.Item>
                          <Menu.Item
                            name="Home"
                            as={Link}
                            to={`/${currentStore}/`} 
                          ></Menu.Item>
                          <Menu.Item
                            name="Testing"
                            as={Link}
                            to="/"
                          ></Menu.Item>
                          <Menu.Item
                            name="Testing"
                            as={Link}
                            to="/"
                          ></Menu.Item>
                          <Dropdown item simple as={Link} to="/" text="Testing">
                            <Dropdown.Menu>
                              <Dropdown.Item>SubCategory</Dropdown.Item>
                              <Dropdown.Item>SubCategory</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item>SubCategory</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Menu.Menu>
                        {authenticated ? (
                          <SignedInMenu
                            currentStore={currentStore}
                            profile={profile}
                            signOut={this.handleSignedOut}
                          />
                        ) : (
                          <SignedOutMenu
                            signIn={this.handleSignedIn}
                            register={this.handleRegister}
                            currentStore={currentStore}
                          />
                        )}
                      </Container>
                    </Menu>
                  </Visibility>
                </div>
        }
      </div>
    );
  }
}

export default withRouter(
    connect(
      mapState,
      actions
    )(firestoreConnect(currentStore => query(currentStore))(NavBar))
);
