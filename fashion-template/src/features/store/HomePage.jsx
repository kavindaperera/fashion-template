import React from "react";
import { connect } from "react-redux";
import { Grid, Image, GridRow, Button, Icon } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoadingComponent from "../../app/layout/LoadingComponent"
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

const mapState = state => ({
  store: state.firestore.ordered.store,
  loading: state.async.loading,
  currentStore: state.store.currentStore
});

const actions = {};

const HomePage = ({ loading, history, store, currentStore }) => {
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
                      onClick={() => history.push("/collection")}
                      alt="a"
                      className="invertedlogo"
                      src={s.storeLogo}
                      size="small"
                      centered
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  {s.categories &&
                    s.categories.map(category => (
                      <Button size="large" color="black" key={category}>
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
                    onClick={() => history.push("/collection")}
                  >
                    Enter Store
                    <Icon name="right arrow" />
                  </Button>
                </GridRow>
                <Grid.Row>
                {s.specialPhotos &&
                        s.specialPhotos.map(photo => (
                            <img style={{ marginTop: "2em" }} alt="a" key={photo} src={photo} />
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
