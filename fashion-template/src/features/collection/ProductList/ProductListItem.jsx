/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Card , Label, Image, Rating} from "semantic-ui-react";
import { Link,Route } from "react-router-dom";
import PriceTag  from '../../pricetag/PriceTag'
import moment from 'moment';




class ProductListItem extends Component {
  render() {
    const { product, store, currency} = this.props;

    //checking Discount Status
    const dateNow = moment().format('X');
    const startDate = product.discount.startDate.seconds;
    const endDate = product.discount.endDate.seconds;
    const discountActive = (startDate < dateNow && dateNow < endDate)

    const rating = (product.rating.totalRating / product.rating.ratingCount);
    //getting store currency
   /* if (config && store) {
      const currencies = config.currencies;
      const storeCurrency = store.currency;
      var value;
      var currency;
      Object.keys(currencies).forEach(function(key) {
      value = currencies[key];
      if (key==storeCurrency){ currency=value}
      });
      console.log('store currency symbol:', currency)
    }*/

    return (
      
      <Card className="card" as={Link} to={`product/${product.id}`} >
      {discountActive && product.discount.percentage > 0 && (
        <div>
        <Label  circular color='red' floating >{"-"}
        {product.discount.percentage}{"%"}
      </Label>
        </div>
      )}
        <div className="ui slide masked reveal image">
          <Image  alt='1' src={product.photos[0].url} className="visible content"></Image>
          <Image  alt='2' src={product.photos[1].url} className="hidden content"></Image>
        </div>
        <div className="content">
          <span className="description">{product.name}</span>
          <div className="meta">
          <PriceTag currency={currency} price= {product.basePrice} discount= {product.discount.percentage} discountActive={discountActive} ></PriceTag>
            <div>
            <Rating  clearable defaultRating={rating} maxRating={5} />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default (ProductListItem) ;
