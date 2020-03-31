import React from "react";
import { Item, Header, Button, Label, Dropdown } from "semantic-ui-react";
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
const ItemDetailedInfo = ({ product, addToCart }) => {
  return (
    <div>
      <Item.Group relaxed='very'>
        <Item>
          <Item.Content>
            <Header
              size="huge"
              content={product.productName}
              style={{ color: "black" }}
            />
              {product.discount && product.discount > 0 && (
                <div>
                  <h2>
                    <del style={{ color: "grey" }}>${product.price} {" "}</del>
                    <a style={{ color: "red" }}>${product.price - (product.price * product.discount) / 100}{" "}
                    </a>
                  </h2>
                </div>
              )}
              {product.discount && product.discount == 0 && (
                <h2>${product.price}</h2>
              )}

            <div className="extra content">
              <Dropdown placeholder="Size" search selection options={sizes} />
            </div>

            <Item>
              {product.colors &&
                product.colors.map(color => (
                  <Label circular key={color}>
                    {color}
                  </Label>
                ))}
            </Item>
          </Item.Content>
        </Item>
        <Button onClick={()=>addToCart(1,product)} color="black">
        Add to Bag
      </Button>
      <Item><p>{product.description}</p></Item>
      </Item.Group>
    </div>
  );
};

export default connect(null, actions)(ItemDetailedInfo);
