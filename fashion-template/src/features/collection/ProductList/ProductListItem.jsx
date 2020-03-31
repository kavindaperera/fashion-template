/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
class ProductListItem extends Component {
  render() {
    const { product } = this.props;

    return (
      <Card className="card" as={Link} to={`/product/${product.id}`}>
        <div  className="ui slide masked reveal image">
          <img alt='1' src={product.photoURL[0]} className="visible content"></img>
          <img  alt='2' src={product.photoURL[1]} className="hidden content"></img>
        </div>
        <div className="content">
          <span className="description">{product.productName}</span>
          <div className="meta">
          {product.discount && product.discount > 0 && (
        <div>
          <h4>
            <del style={{ color: "grey" }}>${product.price}</del><a style={{ color: "red" }} >${product.price - (product.price * product.discount) / 100}{" "}</a>
          </h4>
        </div>
      )}
      {product.discount && product.discount == 0 && <a>${product.price}</a>}
            <div>
              {product.colors && product.colors.length >1 && (
                <div className="date">
                  {product.colors.length} Colours Available
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProductListItem ;
