import React, { Component } from "react";
import ProductListItem from './ProductListItem'
import { Card } from "semantic-ui-react";

class ProductList extends Component {
  render() {
    const { products, currentStore, sortCategory } = this.props;

    return (
      <div>
        <Card.Group itemsPerRow={3}>
          { (sortCategory!=="") && products && products.map(product => ( 
            ( ((product.store).trim() === (currentStore).trim()) && product.visible && (product.category===(sortCategory)) && <ProductListItem key={product.id} product={product} />)
          ))}
          { (sortCategory==="") && products && products.map(product => ( 
            ( ((product.store).trim() === (currentStore).trim()) && product.visible && <ProductListItem key={product.id} product={product} />)
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default ProductList;
