import React from 'react';
import ReactDOM from 'react-dom';
import StockTag from '../StockTag'
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'


afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<StockTag></StockTag>,div)
});

it("renders stock tag correctly",()=>{
    const {getByTestId} = render(<StockTag enableInventoryManagement={true} stock={10}></StockTag>)
    expect(getByTestId('stock-tag')).toHaveTextContent("10 items in stock")
});

it("renders stock tag correctly",()=>{
    const {getByTestId} = render(<StockTag stock={0}></StockTag>)
    expect(getByTestId('stock-tag')).toHaveTextContent("Out of Stock")
});

it("renders stock tag correctly",()=>{
    const {getByTestId} = render(<StockTag stock={null}></StockTag>)
    expect(getByTestId('stock-tag')).toHaveTextContent("")
});

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<StockTag stock={10}></StockTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<StockTag stock={0}></StockTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<StockTag stock={null}></StockTag>).toJSON();
    expect(tree).toMatchSnapshot();
})