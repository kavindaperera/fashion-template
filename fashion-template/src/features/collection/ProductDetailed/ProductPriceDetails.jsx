import React, { Component } from "react";
import { Grid,Card, Label, Accordion, Icon, AccordionPanel, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { addToCart } from "../../cart/cartActions";
import PriceTagLarge  from '../../pricetag/PriceTagLarge';
import { render } from "enzyme";
import VariantSelector from "./VariantSelector";
import _ from "lodash";
import { getCurrency } from '../collectionAction'
import { firestoreConnect } from "react-redux-firebase";


const mapState = (state, ownProps) => ({
  subItems: state.collection.subItems,
  symbol: state.collection.symbol,
  selectedVariant: state.form.variantForm
});


const actions = {
  addToCart
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

    const { product, addToCart, selectedVariant,  symbol, discountActive } = this.props;

    const { activeIndex } = this.state
  
    console.log('selectedVariant:', selectedVariant);

    let variants = product.variants;
    let subItems = product.subItems;
    let displayPrice = null;
    let stock = null;

    selectedVariant && selectedVariant.values && subItems.map((s,i)=> {
      if (_.isEqual(selectedVariant.values, s.variants)){
        console.log('details:',s)
        displayPrice = s.price
        stock = s.stock
      }
    });


  return (
    <div>
    {product &&
      <Grid centered>
        <Grid.Row textAlign='center'>
            <p style={{ color: "black", fontSize: "2rem", fontWeight: "10", fontFamily: 'sans-serif' }}>{_.upperCase(product.name)}
            </p>
        </Grid.Row>
        <Grid.Row>
        <PriceTagLarge currency={symbol} displayPrice={displayPrice} price= {product.basePrice} discount= {product.discount.percentage} discountActive={discountActive} ></PriceTagLarge>
        </Grid.Row>
        <Grid.Row>
          <a>{stock} in stock</a>
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
          <VariantSelector stock={stock} variants={variants} />
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
      </Grid>}
    </div>
  );}
};

export default connect(mapState, actions)(firestoreConnect()(ItemDetailedInfo));
