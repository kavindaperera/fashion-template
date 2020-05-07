import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";

class OrdersDashboard extends Component {
  render() {
    const {} = this.props;
    return (
      <Grid divided="vertically" columns={2}>
        <Grid.Row>
          <Header as="h3">My Bag</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}></Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default OrdersDashboard;
