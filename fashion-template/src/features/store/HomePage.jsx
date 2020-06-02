import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, GridRow, Button, Icon, Header } from "semantic-ui-react";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import { Helmet } from "react-helmet";
import NotFound from "../pages/NotFound/NotFound";
import StoreNotVerified from "../pages/StoreNotVerified/StoreNotVerified";
import Marquee from "react-smooth-marquee"

const mapState = (state, ownProps) => ({
  /*store: state.firestore.ordered.store,*/
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  store: state.firestore.data.selectedStore,
});

const actions = {};

const query = ({ currentStore }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      storeAs: "selectedStore",
    },
  ];
};

class HomePage extends Component {
  /*async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`Stores/${match.params.store}`);
  }*/

  render() {
    const { loading, history, store, currentStore } = this.props;

    //console.log(isLoaded(store), isEmpty(store));

    if (!isLoaded(store) || loading)
      return <LoadingComponent inverted={true} />;

    if (isLoaded(store)) {
      if (store.verified == false) return <StoreNotVerified />;
      if (store.template.id !== 'hUuhCYjpgWUM9DAmHiKq') return <NotFound />;
    }

    return (
      <div className="masthead ">
        {isLoaded(store) && (
          <div>
            <Helmet>
              <title>Home | {store.storeName}</title>s
            </Helmet>
            <Grid key={store.id} className="main">
              <Grid.Row>
                <Grid.Column>
                  {store.storeCustomization.logo && (
                    <Image
                      //onClick={() => history.push(`/${currentStore}/collection/all`)}
                      alt="a"
                      src={store.storeCustomization.logo}
                      size="small"
                      centered
                    />
                  )}
                  {!store.storeCustomization.logo && (
                    <Header as="h2" icon textAlign="center">
                      <Header.Content>{store.storeName}</Header.Content>
                    </Header>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row centered>
                {store.categories &&
                  store.categories.map((category) => (
                    <Button
                      className="home"
                      //as={NavLink}
                      href={`/${currentStore}/collection/${category.name}`}
                      size="large"
                      color="black"
                      key={category.name}
                    >
                      {_.startCase(category.name)}
                    </Button>
                  ))}
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Carousel
                    className="carousel-home"
                    swipeable={true}
                    showThumbs={false}
                    showStatus={false}
                    //autoPlay={true}
                    //infiniteLoop={true}
                    stopOnHover={true}
                    centerMode
                    centerSlidePercentage={25}
                  >
                    {store.storeCustomization.coverPhotos.carousel &&
                      store.storeCustomization.coverPhotos.carousel.map(
                        (photo) => (
                          <img
                            class="carousel-image"
                            alt="a"
                            key={photo}
                            src={photo || "/assets/product_list_image.png"}
                          />
                        )
                      )}
                  </Carousel>
                </Grid.Column>
              </Grid.Row>
              <GridRow centered>
                <Button
                  color="black"
                  size="huge"
                  className="enter-store"
                  //as={NavLink}
                  //to={`/${currentStore}/collection/all`}
                  //onClick={() => history.push(`/${currentStore}/collection/all`)}
                  href={`/${currentStore}/collection/all`}
                >
                  Enter Store
                  <Icon name="right arrow" />
                </Button>
              </GridRow>
              {store.storeCustomization &&
                store.storeCustomization.displayText && (
                  <Grid.Row className='marquee-row'>
                  <Marquee>{store.storeCustomization.displayText}</Marquee>
                  </Grid.Row>
                )}
              <Grid.Row>
                {store.storeCustomization.coverPhotos.banners &&
                  store.storeCustomization.coverPhotos.banners.map((photo) => (
                    <Image
                      fluid
                      style={{ marginTop: ".2rem" }}
                      alt="a"
                      key={photo}
                      src={photo || "/assets/banner.png"}
                    />
                  ))}
              </Grid.Row>
              <Grid.Row></Grid.Row>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect((currentStore) => query(currentStore))(HomePage));

HomePage.defaultProps = {
  store: undefined,
};
