import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Image, Button,Icon, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { queryAllByAltText } from "@testing-library/react";
import StickyBox from "react-sticky-box";
import OrderSummary from '../OrderSummary/OrderSummary'

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading,
});

const actions = {};

class CartDashboard extends Component {
  render() {
    const { auth, loading } = this.props;

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={12}>
          <Header as="h3">My Bag</Header>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
            <Grid.Row>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <StickyBox offsetTop={70} offsetBottom={20}>
              <OrderSummary/>
            </StickyBox>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect()(CartDashboard));
