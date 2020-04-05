import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, GridRow, Button, Icon } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink,} from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent"
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

const mapState = (state, ownProps) => ({
  /*store: state.firestore.ordered.store,*/
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  store: state.firestore.data.selectedStore,
});

const actions = {};

const query = ({currentStore}) => {
  return [
    {
      collection:'store',
      doc: currentStore,
      storeAs: 'selectedStore'
    }
  ]
}


class HomePage extends Component  {

render (){
  const { loading, history, store, currentStore, } = this.props;

  console.log('home',store)
  
  if (loading) return <LoadingComponent inverted={true} />;

  return (
    <div>
      {store &&
              <Grid key={store.id} className="main">
                <Grid.Row>
                  <Grid.Column>
                    <Image
                      onClick={() => history.push(`/${currentStore}/collection/all`)}
                      alt="a"
                      src={store.storeLogo}
                      size="small"
                      centered
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  {store.categories &&
                    store.categories.map(category => (
                      <Button 
                      as={NavLink}
                      to={`/${currentStore}/collection/${category.name}`}
                      size="large" color="black" key={category.name}>
                        {_.capitalize(category.name)}
                      </Button>
                    ))}
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Carousel showThumbs= {false} showStatus={false} centerMode centerSlidePercentage={25}>
                      {store.coverPhotos &&
                        store.coverPhotos.map(photo => (
                            <img alt="a" key={photo} src={photo} />
                        ))}
                    </Carousel>
                  </Grid.Column>
                </Grid.Row>
                <GridRow centered>
                  <Button
                    color="black"
                    size="huge"
                    onClick={() => history.push(`/${currentStore}/collection/all`)}
                  >
                    Enter Store
                    <Icon name="right arrow" />
                  </Button>
                </GridRow>
                <Grid.Row>
                {store.specialPhotos &&
                  store.specialPhotos.map(photo => (
                            <Image fluid style={{ marginTop: "2em" }} alt="a" key={photo} src={photo} />
                        ))}
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>

        }
    </div>
  );
 }
};

export default connect(
  mapState,
  actions
)(firestoreConnect(currentStore => query(currentStore))(HomePage));
