import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Item} from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ id, basePrice, name, photos }) => <Item>
                                                            <Item.Image size='massive' src={photos[0].thumbnail} />
                                                            <Item.Content verticalAlign='middle'>{name}</Item.Content>
                                                            <Item.Content verticalAlign='middle'>{basePrice}</Item.Content>
                                                        </Item>

{/* 
resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}*/}


export default class SearchStandard extends Component {
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
    const { items, currentStore } = this.props;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
        <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(items, null, 2)}
            </pre>
          </Segment>
        </Grid.Column>
        <Grid.Row></Grid.Row>
      </Grid>
    )
  }
}
