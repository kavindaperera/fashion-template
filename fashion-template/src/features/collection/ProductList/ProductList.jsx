import React, { Component } from "react";
import ProductListItem from './ProductListItem'
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";



class ProductList extends Component {

  
  render() {
    const { products, sortCategory, store, currency } = this.props;

    //Function to sort by Category Index
    const categories = store.categories;
    const sortCategoryIndex = categories.map((category, index) =>  { if(category.name==sortCategory){ return index; } } )
    const sortByIndex = sortCategoryIndex.sort()[0]
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          { (sortCategory!=="") && products && products.map(product => ( 
            (  product.visible && (product.category===(sortByIndex)) && <ProductListItem key={product.id}  product={product} store={store} currency={currency} />)
          ))}
          { (sortCategory==="all") && products && products.map(product => ( 
            (  product.visible && <ProductListItem key={product.id} product={product}  store={store} currency={currency}/>)
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default (ProductList);
