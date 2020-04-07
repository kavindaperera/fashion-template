import React, { Component } from "react";
import { Grid, Button, Label, Accordion, Icon, AccordionPanel } from "semantic-ui-react";
import { connect } from "react-redux";
import { addToCart } from "../../cart/cartActions";
import PriceTagLarge  from '../../pricetag/PriceTagLarge';
import { render } from "enzyme";
import VariantSelector from "./VariantSelector";



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

  render() {

    const { product, currency, addToCart, subItems } = this.props;

    const { activeIndex } = this.state

  return (
    <div>
    {product &&
      <Grid centered>
        <Grid.Row textAlign='center'>
            <p style={{ color: "black", fontSize: "20px", fontWeight: "1" }}>
              {product.name}
            </p>
        </Grid.Row>
        <Grid.Row>
        <PriceTagLarge currency={currency} price= {product.basePrice} discount= {product.discount.percentage} ></PriceTagLarge>
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
          <VariantSelector initialValues={subItems} />
           {/*} <Button.Group fluid>
              <Button labelPosition='right' icon='bookmark outline'  onClick={() => addToCart( 1, product)} color="black" content='Add to Bag'/>
            </Button.Group>*/}
          </Grid.Column>
        </Grid.Row>
        <p> <strong>Product Description</strong> </p>
        <p>{product.description}</p>
        <Accordion styled fluid>
          {product.attributes && product.attributes.map((a, index) => ( 
            <div>
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

export default connect(null, actions)(ItemDetailedInfo);
