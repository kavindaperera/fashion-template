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
import { firestoreConnect } from "react-redux-firebase";
import { withFirebase } from "react-redux-firebase";
import {  Link, withRouter } from "react-router-dom";

const actions = {};

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  store: state.firestore.data.selectedStore,

});

/*const query = ({currentStore}) => {
  return [
    {
      collection:'store',
      doc: currentStore
    }
  ]
}*/


class Footer extends Component {

  render() {
    const {store,} = this.props;
    //console.log(store.id)
    return (
      <Segment  inverted vertical style={{ padding: "5em 0em" }}>
      {store &&
        <Container key={store.id}>
          <Grid  centered divided inverted >
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
                <Header inverted as="h4" content={store.storeName}/>
                <List link inverted>
                  <List.Item as="a">About Us</List.Item>
                  <List.Item as="a">FAQ</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
              <Header inverted as="h4" content="Powered by" />
                <Image
                  className="invertedlogo"
                  src={"/company.png"}
                  size="medium"
                  as={Link} to={`/`}    
                  target="_blank"
                /><p>© 2020-2021 TUSK TM. All rights reserved.</p>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
        }
      </Segment>
    );
  }
}

/*export default withRouter(withFirebase(connect(mapState, actions)(Footer)));*/

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(firestoreConnect()(Footer))
  )
);