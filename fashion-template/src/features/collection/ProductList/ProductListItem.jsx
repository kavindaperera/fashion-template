/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Card , Label, Image} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PriceTag  from '../../pricetag/PriceTag'

class ProductListItem extends Component {
  render() {
    const { product, currency} = this.props;

    return (
      
      <Card className="card" as={Link} to={`product/${product.id}`}>
      {product.discount && product.discount > 0 && (
        <div>
        <Label  circular color='red' floating >{"-"}
        {product.discount}{"%"}
      </Label>
        </div>
      )}
        <div className="ui slide masked reveal image">
          <Image  alt='1' src={product.photos[0]} className="visible content"></Image>
          <Image  alt='2' src={product.photos[1]} className="hidden content"></Image>
        </div>
        <div className="content">
          <span className="description">{product.name}</span>
          <div className="meta">
          <PriceTag currency={currency} price= {product.price} discount= {product.discount} ></PriceTag>
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
