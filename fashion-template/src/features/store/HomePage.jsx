import React from "react";
import { connect } from "react-redux";
import { Grid, Image } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";

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
                      src={s.storeLogo}
                      size="small"
                      centered
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row
                  centered
                  columns={s.coverPhotos.length}
                  style={{ padding: "1em" }}
                >
                  {s.coverPhotos.map(photo => (
                    <Grid.Column key={photo} style={{ padding: ".1em" }}>
                      <Image src={photo}/>
                    </Grid.Column>
                  ))}
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
