import React, { Component } from "react";
import ProductListItem from './ProductListItem'
import { Card } from "semantic-ui-react";

class ProductList extends Component {

  
  render() {
    const { products, sortCategory, store } = this.props;

    //Function to sort by Category Index
    const categories = store.categories;
    const sortCategoryIndex = categories.map((category, index) =>  { if(category.name==sortCategory){ return index; } } )
    const sortByIndex = sortCategoryIndex.sort()[0]
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          { (sortCategory!=="") && products && products.map(product => ( 
            (  product.visible && (product.category===(sortByIndex)) && <ProductListItem key={product.id}  product={product} store={store} />)
          ))}
          { (sortCategory==="all") && products && products.map(product => ( 
            (  product.visible && <ProductListItem key={product.id} product={product}  store={store}/>)
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default ProductList;
