import React from "react";
import { connect } from "react-redux";
import { Grid, Image, GridRow, Button, Icon } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink, Link } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent"
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

const mapState = (state, ownProps) => ({
  store: state.firestore.ordered.store,
  loading: state.async.loading,
  currentStore: ownProps.match.params.store,
  param: ownProps.match.params
});

const actions = {};

const HomePage = ({ loading, history, store, currentStore, param }) => {
  console.log("from home page",param);
  if (loading) return <LoadingComponent inverted={true} />;
  return (
    <div>
      {store &&
        store.map(
          s =>
            s.id === currentStore && (
              <Grid key={s.id} className="main">
                <Grid.Row>
                  <Grid.Column>
                    <Image
                      onClick={() => history.push(`/${currentStore}/collection/all`)}
                      alt="a"
                      src={s.storeLogo}
                      size="small"
                      centered
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  {s.categories &&
                    s.categories.map(category => (
                      <Button 
                      as={NavLink}
                      to={`/${currentStore}/collection/${category}`}
                      size="large" color="black" key={category}>
                        {_.capitalize(category)}
                      </Button>
                    ))}
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Carousel showThumbs= {false} showStatus={false} centerMode centerSlidePercentage={25}>
                      {s.coverPhotos &&
                        s.coverPhotos.map(photo => (
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
                {s.specialPhotos &&
                        s.specialPhotos.map(photo => (
                            <Image fluid style={{ marginTop: "2em" }} alt="a" key={photo} src={photo} />
                        ))}
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            )
        )}
    </div>
  );
};

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "store" }])(HomePage));
