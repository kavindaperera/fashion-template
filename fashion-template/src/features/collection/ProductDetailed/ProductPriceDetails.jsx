import React from "react";
import { Grid, Item, Header, Button, Label, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { addToCart } from "../../cart/cartActions";

const sizes = [
  { key: "xxs", text: "XXS", value: "xxs" },
  { key: "xs", text: "XS", value: "xs" },
  { key: "s", text: "S", value: "s" },
  { key: "m", text: "M", value: "m" },
  { key: "l", text: "L", value: "l" },
  { key: "xl", text: "XL", value: "xl" },
  { key: "xxl", text: "XXL", value: "xxl" }
];

const actions = {
  addToCart
};
const ItemDetailedInfo = ({ product,  addToCart }) => {
  return (
    <div>
      <Grid>
        <Grid.Row verticalAlign='bottom' columns={2}>
          <Grid.Column floated="left">
            <p style={{ color: "black", fontSize: "20px", fontWeight: "1" }}>
              {product.productName}
            </p>
          </Grid.Column>
          <Grid.Column floated="right">
            {product.discount && product.discount > 0 && (
              <p>
                <del
                  style={{ color: "grey", fontSize: "20px", fontWeight: "1" }}
                >
                  ${product.price}{" "}
                </del>
                <a style={{ color: "red", fontSize: "20px", fontWeight: "1" }}>
                  ${product.price - (product.price * product.discount) / 100}
                </a>
              </p>
            )}
            {product.discount && product.discount == 0 && (
              <p style={{ color: "grey", fontSize: "20px", fontWeight: "1" }}>
                ${product.price}
              </p>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
          <Label.Group >
            {product.colors &&
              product.colors.map(color => (
                <Label color='grey' size='medium'  key={color}>
                  {color}
                </Label>
              ))}</Label.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Button.Group fluid>
              <Button labelPosition='right' icon='bookmark outline'  onClick={() => addToCart( 1, product)} color="black" content='Add to Bag'/>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <p> <strong>Product Description</strong> </p>
        <p>{product.description}</p>
      </Grid>
    </div>
  );
};

export default connect(null, actions)(ItemDetailedInfo);
