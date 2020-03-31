import React from "react";
import { connect } from "react-redux";
import { Grid, Image, Label, GridRow, Button, Icon } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";

const mapState = state => ({
  store: state.firestore.ordered.store,
  loading: state.async.loading,
  currentStore: "7dbDylC8CZTNBPcVPJyn"
});

const actions = {};

const HomePage = ({ history, store, currentStore }) => {
  return (
    <div>
      {store &&
        store.map(
          s =>
            s.id === currentStore && (
              <Grid className="main">
                <Grid.Row>
                  <Grid.Column>
                    <Image
                      onClick={() => history.push("/collection")}
                      src={"/company.png"}
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
                <Grid.Row centered columns={s.coverPhotos.length} style={{ padding: "1em" }} >
                  {s.coverPhotos && s.coverPhotos.map(photo => (
                    <Grid.Column key={photo} style={{ padding: ".1em" }}>
                      <Image src={photo} />
                    </Grid.Column>
                  ))}
                </Grid.Row>
                <GridRow centered>
                  <Button color="black"  size="huge" onClick={() => history.push("/collection")}>
                    Get Started
                    <Icon name="right arrow" />
                  </Button>
                </GridRow>
                <Grid.Row>

                </Grid.Row>
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
