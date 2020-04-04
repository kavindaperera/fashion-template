import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withFirebase } from "react-redux-firebase";
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
  openModal,
};


const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  store: state.firestore.ordered.store,
  currentStore: ownProps.match.params.store,
  param: ownProps.match.params
});

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "4em",
  transition: "box-shadow s ease, padding 0.5s ease",
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "1px solid #fff",
};

class NavBar extends Component {
  handleSignedIn = () => {
    this.props.openModal("LoginModal");
  };

  handleSignedOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
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
    const { auth, profile, store, currentStore, param } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const { menuFixed } = this.state;
    console.log("from navbar",{param})
    return (
      <div>
        {store &&
          store.map(
            (s) =>
              s.id === currentStore && (
                <div>
                  <Container as={Link} to={`/${currentStore}/`}  style={{ marginTop: "2em" }}>
                    <Image
                      alt="a"
                      src={s.storeLogo}
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
                          <Image  size="tiny" src={s.storeLogo} alt="a"/>
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
                            profile={profile}
                            signOut={this.handleSignedOut}
                          />
                        ) : (
                          <SignedOutMenu
                            signIn={this.handleSignedIn}
                            register={this.handleRegister}
                          />
                        )}
                      </Container>
                    </Menu>
                  </Visibility>
                </div>
              )
          )}
      </div>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(firestoreConnect([{ collection: "store" }])(NavBar))
  )
);
