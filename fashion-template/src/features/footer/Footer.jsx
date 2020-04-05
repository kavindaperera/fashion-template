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
import { NavLink, Link, withRouter } from "react-router-dom";
import {getStore} from '../store/storeActions'

const actions = {getStore};

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  store: state.store[0],
  currentStore: ownProps.match.params.store

});

class Footer extends Component {

  componentDidMount() {
    this.props.getStore(this.props.currentStore);
  }
  render() {
    const {store, currentStore } = this.props;
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
              <Grid.Column>
              <table border="0" cellpadding="10" cellspacing="0" align="center"><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/9_bdg_secured_by_pp_2line.png" border="0" alt="Secured by PayPal"></img></a></td></tr></table>
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
    )(firestoreConnect([{ collection: "store" }])(Footer))
  )
);