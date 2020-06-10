import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import _ from "lodash";
import { Helmet } from "react-helmet";

const mapState = (state, ownProps) => ({
  store: state.firestore.data.selectedStore,
});

const actions = {};

class AboutUs extends Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        {isLoaded(store) && (
          <div>
            <Helmet>
              <title>
                {"About Us"} | {store.storeName}
              </title>
            </Helmet>
            <Segment style={{ padding: "8em 0em" }} vertical>
              <Grid container stackable verticalAlign="middle">
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      About Us
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                      {store.aboutUs || store.storeName}
                    </p>
                  </Grid.Column>
                  <Grid.Column floated="right" width={6}>
                    <Image
                      bordered
                      size="large"
                      src={
                        store.storeCustomization.coverPhotos.carousel[0] ||
                        "/assets/product_list_image.png"
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment style={{ padding: "0em" }} vertical>
              <Grid celled="internally" columns="equal" stackable>
                <Grid.Row textAlign="center">
                  <Grid.Column
                    style={{ paddingBottom: "5em", paddingTop: "5em" }}
                  >
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      Find Us
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                      {store.address || store.storeName}
                    </p>
                  </Grid.Column>
                  <Grid.Column
                    style={{ paddingBottom: "5em", paddingTop: "5em" }}
                  >
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      Other ways to get in touch
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                      <Icon  name="call" />
                      {store.telephoneNo || "N/A"}
                    </p>
                    <p style={{ fontSize: "1.33em" }}>
                      <Icon name="mail" />
                      {store.email || "N/A"}
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapState, actions)(AboutUs);
