/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Card, Label, Image, Rating } from "semantic-ui-react";
import { Link, Route } from "react-router-dom";
import PriceTag from "../../pricetag/PriceTag";
import moment from "moment";


class ProductListItem extends Component {
  render() {
    const { product, store, currency, enableRating } = this.props;
    let discountActive = false;
    let discount = 0;
    let rating = product.rating.totalRating / product.rating.ratingCount;
    if (isNaN(rating) ){
      rating=0
    }

    //checking Discount Status
    if (product.discount != null) {
      const dateNow = moment().format("X");
      const startDate = product.discount.startDate.seconds;
      const endDate = product.discount.endDate.seconds;
      discountActive = startDate < dateNow && dateNow < endDate;
      discount = product.discount.percentage;
    }

    return (
      <Card className="card" title={product.name} as={Link} to={`product/${product.id}`}>
        {discountActive && product.discount.percentage > 0 && (
          <div>
            <Label circular color="red" floating>
              {"-"}
              {product.discount.percentage}
              {"%"}
            </Label>
          </div>
        )}

        {/*if 2 product images are available*/}
        {product.photos[0] && product.photos[1] && (
          <div className="ui slide masked reveal image">
            <Image
              alt="1"
              src={product.photos[0].url || "/assets/product_list_image.png"}
              className="visible content"
            ></Image>
            <Image
              alt="2"
              src={product.photos[1].url || "/assets/product_list_image.png"}
              className="hidden content"
            ></Image>
          </div>
        )}

        {/*if only 1 product image is available*/}
        {product.photos[0] && !product.photos[1] && (
          <div className="ui slide masked reveal image">
            <Image
              alt="1"
              src={product.photos[0].url}
              className="visible content"
            ></Image>
            <Image
              alt="2"
              src={product.photos[0].url}
              className="hidden content"
            ></Image>
          </div>
        )}

        {/*if no product images are available*/}
        {!product.photos[0] && !product.photos[1] && (
          <div className="ui slide masked reveal image">
            <Image
              alt="1"
              src={"/assets/product_list_image.png"}
              className="visible content"
            ></Image>
            <Image
              alt="2"
              src={"/assets/product_list_image.png"}
              className="hidden content"
            ></Image>
          </div>
        )}

        <div className="content">
          <span className="description">{product.name}</span>
          <div className="meta">
            <PriceTag
              currency={currency}
              price={product.basePrice}
              discount={discount}
              discountActive={discountActive}
            ></PriceTag>
            <div>
            {enableRating && rating>0 && <Rating clearable defaultRating={rating} maxRating={5} /> }
            {enableRating && rating==0 && <p style={{ color: "grey" }}>still not rated</p> }

            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProductListItem;
