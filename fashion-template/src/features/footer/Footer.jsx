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
  currentStore: ownProps.match.params.store,

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
                <Header inverted as="h4" content={`Why shop at ${store.storeName}`} />
                <List link inverted>
                  <List.Item as="a" href={`/${this.props.currentStore}/customer-feedback`}>Customer Testimonals</List.Item>
                  
                
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content={store.storeName}/>
                <List link inverted>
                <List.Item as="a" href={`/${this.props.currentStore}/lookbook`} >LookBook</List.Item>
                  <List.Item as="a" href={`/${this.props.currentStore}/about-us`} >About Us</List.Item>
                  <List.Item as="a" href={`/${this.props.currentStore}/contact-us`}>Contact Us</List.Item>
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