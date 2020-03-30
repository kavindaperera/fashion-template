import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Image,
} from "semantic-ui-react";

const mapState = state => ({
  shop: state.shop
});

const HomePage = ({ history, shop }) => {
  return (
    <Grid.Row>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Image src={shop.logoURL} size="small" centered />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          centered
          columns={shop.photoURL[0].one.length}
          style={{ padding: "1em" }}
        >
          <div>New Skirts</div>
          {shop.photoURL[0].one.map(photo => (
            <Grid.Column style={{ padding: ".1em" }}>
              <Image key={photo} src={photo} />
            </Grid.Column>
          ))}
        </Grid.Row>
        <Grid.Row
          centered
          columns={shop.photoURL[0].two.length}
          style={{ padding: "1em" }}
        >
          <div>New Jeans</div>
          {shop.photoURL[0].two.map(photo => (
            <Grid.Column style={{ padding: ".1em" }}>
              <Image key={photo} src={photo} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Grid.Row>
  );
};

export default connect(mapState)(HomePage);
