import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from "../NotFound";
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<NotFound></NotFound>,div)
});

it("renders page correctly",()=>{
    const {getByTestId} = render(<NotFound ></NotFound>)
    expect(getByTestId('not-found')).toHaveTextContent('404Page not foundGo Back')
});

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<NotFound></NotFound>).toJSON();
    expect(tree).toMatchSnapshot();
})