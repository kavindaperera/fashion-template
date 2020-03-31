import React, { Component } from "react";
import ProductListItem from './ProductListItem'
import { Card } from "semantic-ui-react";

class ProductList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div>
        <Card.Group itemsPerRow={3}>
          {products && products.map(product => ( 
            (product.store===" 7dbDylC8CZTNBPcVPJyn" && <ProductListItem key={product.id} product={product} />)
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default ProductList;
