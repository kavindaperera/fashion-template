import React, { Component } from "react";
import { Grid,Card, Label, Accordion, Icon, AccordionPanel, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import PriceTagLarge  from '../../pricetag/PriceTagLarge';
import { render } from "enzyme";
import VariantSelector from "./VariantSelector";
import _ from "lodash";
import { getCurrency } from '../collectionAction'
import { firestoreConnect } from "react-redux-firebase";
import StockTag from "../../stocktag/StockTag";



const mapState = (state, ownProps) => ({
  subItems: state.collection.subItems,
  symbol: state.collection.symbol,
  selectedVariant: state.form.variantForm,
  store : state.firestore.data.selectedStore,
});


const actions = {
};


class ItemDetailedInfo extends Component {


  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }


  /*async componentDidMount(){
    if (this.props.product.subItems){
      this.props.getSubItems(this.props.product, this.props.currentStore);
    }
  }*/

  render() {

    const { currentStore, product, discount, productId, addToCart, selectedVariant,  symbol, discountActive, reviews, store, loading  } = this.props;

    const { activeIndex } = this.state

    let variants = product.variants;
    let subItems = product.subItems;
    let displayPrice = null;
    let stock = null;
    let subItemIndex = null;
    let enableInventoryManagement = false;



    selectedVariant && selectedVariant.values && subItems.map((s,i)=> {
      //console.log(selectedVariant)
      if (_.isEqual(selectedVariant.values, s.variants)){
        subItemIndex = i
        displayPrice = s.price
        stock = s.stock
      }
    });

    if(store){
      enableInventoryManagement = store.enableInventoryManagement;
    }


  return (
    <div>
    {product &&
      <Grid centered>
        <Grid.Row textAlign='center'>
            <p style={{ color: "grey", fontSize: "2rem" }}>{_.upperCase(product.name)}
            </p>
        </Grid.Row>
        <Grid.Row>
        <PriceTagLarge currency={symbol} displayPrice={displayPrice} price= {product.basePrice} discount= {discount} discountActive={discountActive} ></PriceTagLarge>
        </Grid.Row>
        <Grid.Row>
          <StockTag stock={stock} selectedVariant={selectedVariant} enableInventoryManagement={enableInventoryManagement}/>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column>
          <Label.Group >
            {product.colors &&
              product.colors.map(color => (
                <Label color='grey' size='medium'  key={color}>
                  {color}
                </Label>
              ))}</Label.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
          <VariantSelector loading={loading} stock={stock} variants={variants} product={product} subItemIndex={subItemIndex} displayPrice={displayPrice} currentStore={currentStore}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >
          <p> <strong>Product Description</strong> </p>
          <p>{product.description}</p>
        </Grid.Row>
        <Accordion styled fluid>
          {product.attributes && product.attributes.map((a, index) => (
            <div key={index}>
            <Accordion.Title
            key={a.title}
            active={activeIndex === index}
            index={index}
            onClick={this.handleClick}
            >
            <Icon name='dropdown' />{a.title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <p>{a.attribute}</p>
            </Accordion.Content></div>
          ))}
        </Accordion>
        <Grid.Row>
        </Grid.Row>
      </Grid>}
    </div>
  );}
};

export default connect(mapState, actions)((ItemDetailedInfo));
