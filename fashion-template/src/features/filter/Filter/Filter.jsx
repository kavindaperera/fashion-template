import React, { Component } from 'react'
import { Grid,  Menu, Dropdown } from "semantic-ui-react";

export default class Filter extends Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.count} products found
                </div>
                <label>
                <select onChange={(e) => this.props.handleChangeSort(e.target.value)}>
                        <option value="">Recommended</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="new">New Arrivals</option>
                        <option value="sale">On Sale</option>
                    </select>
                </label>
                <label>
                <select onChange={(e) => this.props.handleChangeCategory(e.target.value)}>
                        <option value="">ALL</option>
                        <option value="women">WOMEN</option>
                        <option value="men">MEN</option>
                        <option value="Newest">NEW</option>
                    </select>
                </label> 
            </div>
        )
    }
}
