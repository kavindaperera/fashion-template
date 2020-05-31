import React from 'react';
import ReactDOM from 'react-dom';
import RatingTag from '../RatingTag'
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';
import { Rating } from "semantic-ui-react";

afterEach(cleanup);

it("ratings tag renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<RatingTag></RatingTag>,div)
});

it("renders rating tag correctly",()=>{
    const {getByTestId} = render(<RatingTag enableRating={true} rating={0} ></RatingTag>)
    expect(getByTestId('rating-tag')).toHaveTextContent("still not rated")
});

it("renders rating tag correctly",()=>{
    const {getByTestId} = render(<RatingTag enableRating={false} rating={0} ></RatingTag>)
    expect(getByTestId('rating-tag')).toHaveTextContent("")
});

it("renders rating tag correctly",()=>{
    const {getByTestId} = render(<RatingTag enableRating={true} rating={5} ></RatingTag>)
    expect(getByTestId('rating-tag')).toHaveTextContent("")
});

it("renders rating tag correctly",()=>{
    const {getByTestId} = render(<RatingTag enableRating={false} rating={5} ></RatingTag>)
    expect(getByTestId('rating-tag')).toHaveTextContent("")
});

it("renders rating tag correctly",()=>{
    const {getByTestId} = render(<RatingTag enableRating={true} rating={3} ></RatingTag>)
    expect(getByTestId('rating-tag')).toHaveTextContent("")
});

it("renders rating tag correctly",()=>{
    const {getByTestId} = render(<RatingTag enableRating={false} rating={3} ></RatingTag>)
    expect(getByTestId('rating-tag')).toHaveTextContent("")
});

//Snapshot Testing

it('matches snapshot 1', ()=>{
    const tree = renderer.create(<RatingTag enableRating={true} rating={0} ></RatingTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 2', ()=>{
    const tree = renderer.create(<RatingTag enableRating={false} rating={0} ></RatingTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 3', ()=>{
    const tree = renderer.create(<RatingTag enableRating={true} rating={5}></RatingTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 4', ()=>{
    const tree = renderer.create(<RatingTag enableRating={false} rating={5}></RatingTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 5', ()=>{
    const tree = renderer.create(<RatingTag enableRating={true} rating={3}></RatingTag>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 6', ()=>{
    const tree = renderer.create(<RatingTag enableRating={false} rating={3}></RatingTag>).toJSON();
    expect(tree).toMatchSnapshot();
})



