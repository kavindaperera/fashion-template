import React, { Component } from "react";
import ProductListItem from './ProductListItem'
import { Card } from "semantic-ui-react";

class ProductList extends Component {
  render() {
    const { products, sortCategory, currency } = this.props;

    return (
      <div>
        <Card.Group itemsPerRow={3}>
          { (sortCategory!=="") && products && products.map(product => ( 
            (  product.visible && (product.category===(sortCategory)) && <ProductListItem key={product.id}  product={product} currency={currency} />)
          ))}
          { (sortCategory==="all") && products && products.map(product => ( 
            (  product.visible && <ProductListItem key={product.id} product={product}  currency={currency}/>)
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default ProductList;
