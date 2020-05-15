import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  Menu,
  Container,
  Dropdown,
  Visibility,
  Image,
  Search
} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import {getCurrency}from '../../collection/collectionAction'
import "../../../index.css";
import CurrencyFlag from 'react-currency-flags';
import _ from "lodash";
import ChatButton from "../../button/ChatButton";

const actions = {
  openModal,
  getCurrency
};

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  store: state.firestore.data.selectedStore,
  currentStore: ownProps.match.params.store,
  config: state.firestore.data.config,
  params: ownProps.match.params
});

const query = ({currentStore}) => {
  return [
    {
      collection:'Stores',
      doc: currentStore,
      storeAs: 'selectedStore'
    },{
      collection:'Config',
      doc: 'config_main',
      storeAs: 'config'
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
  backgroundColor: "#f5f5f5",
};

const fixedMenuStyle = {
  backgroundColor: "#f5f5f5",
  border: "1px solid #fff",
};


class NavBar extends Component {

  


  handleSignedIn = () => {
    this.props.openModal("LoginModal",this.props.currentStore);
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
    const { auth, profile, store,  currentStore, config, getCurrency} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const { menuFixed } = this.state;

    //getting store currency
    if (config && store) {
      getCurrency(config,store);
      const currencies = config.currencies;
      const storeCurrency = store.currency;
      var value;
      var currency;
      Object.keys(currencies).forEach(function(key) {
      value = currencies[key];
      if (key==storeCurrency){ currency=value}
      });
    }


    return (
      <div>
        {store &&
                <div>
                {store && store.enableChatbot && <ChatButton storeId={currentStore} /> }
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
                            name="Home"
                            as={Link}
                            to={`/${currentStore}/`} 
                          ></Menu.Item>
                          <Menu.Item
                            name="Clothing"
                            as={NavLink}
                            to={`/${currentStore}/collection/all`} 
                          ></Menu.Item>
                          <Dropdown item simple  text="Categories">
                            <Dropdown.Menu>
                            <Dropdown.Item
                                as={NavLink}
                                to={`/${currentStore}/collection/all`}
                              >All</Dropdown.Item>
                              
                            {store.categories && store.categories.map(category => ( 
                              <Dropdown.Item
                                key={category.name}
                                as={NavLink}
                                to={`/${currentStore}/collection/${category.name}`}
                              >{_.capitalize(category.name)}</Dropdown.Item>
                              ))}

                            </Dropdown.Menu>
                          </Dropdown>
                        </Menu.Menu>
                        <Menu.Menu position="right">
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
                          />
                        )}
                        <Menu.Item>
                        <CurrencyFlag title={store.currency} currency={store.currency} size="lg" />
                        </Menu.Item>
                        </Menu.Menu>
                      </Container>
                    </Menu>
                  </Visibility>
                </div>
        }
      </div>
    );
  }
}

export default withRouter(connect( mapState,actions)(firestoreConnect(currentStore => query(currentStore))(NavBar)));
