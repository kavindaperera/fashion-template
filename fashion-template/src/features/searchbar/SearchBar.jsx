import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid,  Image,} from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ id, basePrice, name, photos }) => <div>{photos[0] && <Image className='searchImage' src= {photos[0].thumbnail || "/assets/product_list_image.png"}  size='large' ></Image>}<span>{name}</span></div>


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
