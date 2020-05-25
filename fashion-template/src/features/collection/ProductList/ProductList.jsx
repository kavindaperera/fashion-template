import React, { Component } from "react";
import ProductListItem from './ProductListItem'
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";



class ProductList extends Component {

  render() {
    const { products, sortCategory, store, currency, enableRating, currentStore } = this.props;
    //Function to sort by Category Index
    const categories = store.categories;
    const sortCategoryIndex = categories.map((category, index) =>  { if(category.name==sortCategory){ return index; } } )
    const sortByIndex = sortCategoryIndex.sort()[0]

    return (
      <div>
        <Card.Group className='group-collection' itemsPerRow={3}>
          { (sortCategory!=="") && products && products.map(product => (
            (  product.visible &&  (!product.deleted) && (product.category===(sortByIndex)) && <ProductListItem enableRating={enableRating} key={product.id}  product={product}  currency={currency} currentStore={currentStore} />)
          ))}
          { (sortCategory==="all") && products && products.map(product => (
            (  product.visible && (!product.deleted) && <ProductListItem enableRating={enableRating} key={product.id} product={product}   currency={currency} currentStore={currentStore} />)
          ))}

        </Card.Group>
      </div>
    );
  }
}


export default (ProductList);