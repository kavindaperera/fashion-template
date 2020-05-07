import React from 'react';
import ReactDOM from 'react-dom';
import PriceTag from "../PriceTag";
import PriceTagCart from "../PriceTagCart";
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'


afterEach(cleanup);

//PriceTag

it("price tag renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<PriceTag></PriceTag>,div)
});

it("renders price tag correctly",()=>{
    const {getByTestId} = render(<PriceTag currency='$' price={100} discountActive={true} discount="50"></PriceTag>)
    expect(getByTestId('price-tag')).toHaveTextContent("$100$50")
});

it("renders price tag correctly",()=>{
    const {getByTestId} = render(<PriceTag currency='$' price={100} discountActive={true} discount="0"></PriceTag>)
    expect(getByTestId('price-tag')).toHaveTextContent("$100")
});

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<PriceTag currency='$' price={100} discountActive={true} discount="50"></PriceTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 2', ()=>{
    const tree = renderer.create(<PriceTag currency='$' price={100} discountActive={true} discount="0"></PriceTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

//PriceTagCart

it("price tag cart renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<PriceTagCart></PriceTagCart>,div)
});

it("renders price tag cart correctly",()=>{
    const {getByTestId} = render(<PriceTagCart currency='$' price={100} discountActive={true} discount="50"></PriceTagCart>)
    expect(getByTestId('price-tag-cart')).toHaveTextContent("$100$50")
});

it("renders price tag cart correctly",()=>{
    const {getByTestId} = render(<PriceTagCart currency='$' price={100} discountActive={true} discount="0"></PriceTagCart>)
    expect(getByTestId('price-tag-cart')).toHaveTextContent("$100")
});

it('matches snapshot 3', ()=>{
    const tree = renderer.create(<PriceTagCart currency='$' price={100} discountActive={true} discount="50"></PriceTagCart>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 4', ()=>{
    const tree = renderer.create(<PriceTagCart currency='$' price={100} discountActive={true} discount="0"></PriceTagCart>).toJSON();
    expect(tree).toMatchSnapshot();
})