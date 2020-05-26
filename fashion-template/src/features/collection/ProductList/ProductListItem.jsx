/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Label, Image, Rating, Button, } from "semantic-ui-react";
import { Link, withRouter  } from "react-router-dom";
import { compose } from 'redux';
import PriceTag from "../../pricetag/PriceTag";
import moment from "moment";
import { openModal } from "../../modals/modalActions";
import LazyImage from "../../lazyImage/LazyImage";

const mapState = (state, ownProps) => ({

});

const actions = {openModal};


class ProductListItem extends Component {
  render() {
    const {history, product, currency, enableRating , currentStore, openModal} = this.props;

    let discountActive = false;
    let discount = 0;
    let rating = product.rating.totalRating / product.rating.ratingCount;
    if (isNaN(rating)) {
      rating = 0;
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
      <Card
        className="card-list"
        title={product.name}
        //as={Link} to={`product/${product.id}`}
      >
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
            { currentStore && <Button
              className="quick-view"
              onClick={() => openModal("QuickViewModal", { product: product , currentStore: currentStore})
              }
            >
              Quick View
            </Button>}
            <a className="visible content" onClick= {() => history.push(`product/${product.id}`)}>
            <LazyImage 
              alt="1"
              src={product.photos[0].url || "/assets/product_list_image.png"}
              thumb={ product.photos[0].thumbnail || "/assets/product_list_image.png" }
            ></LazyImage></a>
            <a className="hidden content" onClick= {() => history.push(`product/${product.id}`)}>
            <LazyImage
              alt="2"
              src={product.photos[1].url || "/assets/product_list_image.png"}
              thumb={ product.photos[1].thumbnail || "/assets/product_list_image.png" }
            ></LazyImage></a>
          </div>
        )}

        {/*if only 1 product image is available*/}
        {product.photos[0] && !product.photos[1] && (
          <div className="ui slide masked reveal image">
          { currentStore && <Button
              className="quick-view"
              onClick={() => openModal("QuickViewModal", { product: product , currentStore: currentStore})
              }
            >
              Quick View
            </Button>}
            <a className="visible content" onClick= {() => history.push(`product/${product.id}`)}>
            <LazyImage
              alt="1"
              src={product.photos[0].url || "/assets/product_list_image.png"}
              thumb={ product.photos[0].thumbnail || "/assets/product_list_image.png" }
            ></LazyImage></a>
            <a className="hidden content" onClick= {() => history.push(`product/${product.id}`)}>
            <LazyImage
              alt="2"
              src={product.photos[0].url || "/assets/product_list_image.png"}
              thumb={ product.photos[0].thumbnail || "/assets/product_list_image.png" }
            ></LazyImage></a>
          </div>
        )}

        {/*if no product images are available*/}
        {!product.photos[0] && !product.photos[1] && (
          <div className="ui slide masked reveal image">
          <a className="visible content" onClick= {() => history.push(`product/${product.id}`)}>x
            <LazyImage

              alt="1"
              src={"/assets/product_list_image.png"}
              thumb={"/assets/product_list_image.png" }
            ></LazyImage></a>
            <a className="hidden content" onClick= {() => history.push(`product/${product.id}`)}>
            <LazyImage
              alt="2"
              src={ "/assets/product_list_image.png"}
              thumb={"/assets/product_list_image.png" }
            ></LazyImage></a>
          </div>
        )}

        <div className="content" >
          <span className="description">{product.name}</span>
          <div className="meta">
            <PriceTag
              currency={currency}
              price={product.basePrice}
              discount={discount}
              discountActive={discountActive}
            ></PriceTag>
            <div>
              {enableRating && rating > 0 && (
                <Rating clearable defaultRating={rating} maxRating={5} />
              )}
              {enableRating && rating == 0 && (
                <p style={{ color: "grey" }}>still not rated</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(connect(mapState,actions)(ProductListItem));
