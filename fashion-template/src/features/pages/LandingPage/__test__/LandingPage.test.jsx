import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from "../LandingPage";
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'



it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<LandingPage></LandingPage>,div)
});

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<LandingPage></LandingPage>).toJSON();
    expect(tree).toMatchSnapshot();
})