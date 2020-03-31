import React, { Component } from "react";
import {
  Segment,
  Container,
  Grid,
  List,
  Header,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { NavLink, Link, withRouter } from "react-router-dom";

const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class Footer extends Component {
  render() {
    return (
      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid  centered divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Get Help" />
                <List link inverted>
                  <List.Item as="a">Size Guide</List.Item>
                  <List.Item as="a">Contact Us</List.Item>
                  <List.Item as="a">Shipping</List.Item>
                  <List.Item as="a">Returns & Exchanges</List.Item>
                  <List.Item as="a">Payments & Security</List.Item>
                  <List.Item as="a">Order Tracking</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Store Name Here" />
                <List link inverted>
                  <List.Item as="a">About Us</List.Item>
                  <List.Item as="a">FAQ</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
              <Header inverted as="h4" content="Powered by" />
                <Image
                  className="footerlogo"
                  src={"/company.png"}
                  size="medium"
                  as={Link} to={`/`}    
                  target="_blank"
                /><p>© 2020-2021 TUSK TM. All rights reserved.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(Footer)));
