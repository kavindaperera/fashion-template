import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import { firestoreConnect, isLoaded, withFirestore, } from "react-redux-firebase";
import {
  Menu,
  Container,
  Dropdown,
  Visibility,
  Image,
  Icon,
  Header
} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { getCurrency } from "../../collection/collectionAction";
import "../../../index.css";
import CurrencyFlag from "react-currency-flags";
import _ from "lodash";
import ChatButton from "../../button/ChatButton";
import SearchBar from "../../searchbar/SearchBar";
import { Helmet } from "react-helmet";
import LoadingComponent from "../../../app/layout/LoadingComponent"
import StoreNotVerified from '../../pages/StoreNotVerified/StoreNotVerified'

const actions = {
  openModal,
  getCurrency,
};

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  store: state.firestore.data.selectedStore,
  currentStore: ownProps.match.params.store,
  config: state.firestore.data.config,
  params: ownProps.match.params,
  items: state.firestore.ordered.items,
});

const query = ({ currentStore }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      storeAs: "selectedStore",
    },
    {
      collection: "Config",
      doc: "config_main",
      storeAs: "config",
    },
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items" }],
      storeAs: "items",
    },
    {
      collection: `/Stores/${currentStore}/Items`,
      storeAs: "items",
    },
  ];
};

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
    this.props.openModal("LoginModal", this.props.currentStore);
  };

  handleSignedOut = () => {
    this.props.firebase.logout();
    console.log("signingout from:", this.props.currentStore);
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
    const {
      auth,
      profile,
      store,
      currentStore,
      config,
      items,
      getCurrency,
    } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const { menuFixed } = this.state;

  if (!isLoaded(store) ) return <LoadingComponent inverted={true} />;  

  if(isLoaded(store)) {

    if (store.verified == false) return <StoreNotVerified />;

  }


    //getting store currency
    if (config && store) {

      getCurrency(config, store);
      const currencies = config.currencies;
      const storeCurrency = store.currency;
      var value;
      var currency;
      Object.keys(currencies).forEach(function (key) {
        value = currencies[key];
        if (key == storeCurrency) {
          currency = value;
        }
      });
    }


    return (
      <div>
        {store && (
          <div>
            <Helmet>
              <title>{store.storeName}</title>
            </Helmet>
            {store && store.enableChatbot && (
              <ChatButton storeId={currentStore} />
            )}
            <Container
              //as={Link}
              href={`/${currentStore}/`}
              style={{ marginTop: "2em" }}
            >
              {store.storeCustomization.logo && <Image
                alt="a"
                src={store.storeCustomization.logo}
                size="small"
                centered
              />}
               {!store.storeCustomization.logo && <Header as='h2' icon textAlign='center'>
                                                          <Header.Content>{store.storeName}</Header.Content>
                                                      </Header>}
            </Container>

            <Visibility
              onBottomPassed={this.stickTopMenu}
              onBottomVisible={this.unStickTopMenu}
              once={false}
            >
              <Menu
              stackable
                borderless
                fixed={menuFixed ? "top" : undefined}
                style={menuFixed ? fixedMenuStyle : menuStyle}
              >
                <Container fluid className="nav">
                  <Menu.Item  href={`/${currentStore}/`} header>
                  {store.storeCustomization.logo && <Image
                      size="tiny"
                      src={store.storeCustomization.logo}
                      alt="a"
                    />}
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

                    <Dropdown item simple text="Categories">
                      <Dropdown.Menu className="categories">
                        <Dropdown.Item
                          as={NavLink}
                          to={`/${currentStore}/collection/all`}
                        >
                          All
                        </Dropdown.Item>
                        {store.categories &&
                          store.categories.map((category) => (
                            <Dropdown.Item
                              key={category.name}
                              as={NavLink}
                              to={`/${currentStore}/collection/${category.name}`}
                            >
                              {_.capitalize(category.name)}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Menu>
                  <Menu.Menu position="right">
                    <Menu.Item
                      style={{ margin: "0", padding: "0", border: "0px" }}
                    >
                      <SearchBar
                        items={items}
                        currency={store.currency}
                        currentStore={currentStore}
                      />
                    </Menu.Item>
                    <Menu.Item
                      title="My Bag"
                      //as={Link}
                      href={`/${currentStore}/cart`}
                    >
                      <Icon name="shopping bag" size="large" />
                    </Menu.Item>
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
                      <CurrencyFlag
                        title={store.currency}
                        currency={store.currency}
                        size="lg"
                      />
                    </Menu.Item>
                  </Menu.Menu>
                </Container>
              </Menu>
            </Visibility>
          </div>
        )}
      </div>
    );
  }
}

/*export default withRouter(
  connect(
    mapState,
    actions
  )(firestoreConnect((currentStore) => query(currentStore))(NavBar))
);*/


export default compose(withRouter, withFirestore, connect(mapState,actions), firestoreConnect((currentStore) => query(currentStore) ))(NavBar);