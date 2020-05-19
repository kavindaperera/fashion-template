import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Item, Image, Card} from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ id, basePrice, name, photos }) => <div><Image className='searchImage' src= {photos[0].thumbnail}  size='large' ></Image><span>{name}</span></div>




{/* 
resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}*/}


export default class SearchBar extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.name }.then(window.location.href = `/${this.props.currentStore}/collection/product/${result.id}`))

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.items, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    const { items, currentStore, currency } = this.props;
    console.log(this.state.results)
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results.slice(0, 3)}
            resultRenderer={resultRenderer}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
