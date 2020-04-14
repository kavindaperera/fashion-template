import React, { Component } from "react";
import { Grid,Card, Label, Accordion, Icon, AccordionPanel, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { addToCart } from "../../cart/cartActions";
import PriceTagLarge  from '../../pricetag/PriceTagLarge';
import { render } from "enzyme";
import VariantSelector from "./VariantSelector";
import _ from "lodash";
import { getSubItems, getCurrency } from '../collectionAction'
import { firestoreConnect } from "react-redux-firebase";


const mapState = (state, ownProps) => ({
  subItems: state.collection.subItems,
  symbol: state.collection.symbol,
});


const actions = {
  addToCart,
  getSubItems
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

    const { product, addToCart ,  symbol, discountActive } = this.props;

    const { activeIndex } = this.state
    console.log('symbol', symbol)
    
    let variants = product.variants;
    let subItems = product.subItems;
    console.log('subItems',subItems)




  return (
    <div>
    {product &&
      <Grid centered>
        <Grid.Row textAlign='center'>
            <p style={{ color: "black", fontSize: "2rem", fontWeight: "10", fontFamily: 'sans-serif' }}>{_.upperCase(product.name)}
            </p>
        </Grid.Row>
        <Grid.Row>
        <PriceTagLarge currency={symbol} price= {product.basePrice} discount= {product.discount.percentage} discountActive={discountActive} ></PriceTagLarge>
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
          {/*<Card.Group itemsPerRow={3}>
          { subItems && subItems.map(subItem => ( 
            <Card>
              <Card.Content description={subItem.price}/>
              <Card.Content description={subItem.stock}/>
              <Card.Content description={subItem.variants[0]}/>
              <Card.Content description={subItem.variants[1]}/>
            </Card>
            ))}
            </Card.Group>*/}
          <VariantSelector variants={variants} />
           {/*} <Button.Group fluid>
              <Button labelPosition='right' icon='bookmark outline'  onClick={() => addToCart( 1, product)} color="black" content='Add to Bag'/>
            </Button.Group>*/}
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
