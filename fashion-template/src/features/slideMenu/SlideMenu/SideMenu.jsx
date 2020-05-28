import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import { NavLink,  withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { withFirebase, firestoreConnect } from "react-redux-firebase";




const mapState = (state, ownProps) => ({
    store: state.firestore.data.selectedStore,
    loading: state.async.loading,
    //category: ownProps.match.params
    currentStore: ownProps.match.params.store
  });

  const actions = {};


class SideMenu extends Component {
  state = { activeItem: '' }


  handleItemClick = (e,  {name} ) => this.setState({ activeItem: name })

  render() {
    const { store, sortCategory } = this.props;
    const { activeItem } = this.state

    return (
      <Menu stackable pointing secondary vertical>
      <Menu.Item header>CATEGORY</Menu.Item>
      <Menu.Item
          name= "All"
          active={activeItem === {sortCategory}}
          onClick={this.handleItemClick}
          as={NavLink}
          to={`/${this.props.currentStore}/collection/all`}
        />
        {store &&
         (store.categories && 
         store.categories.map(category => 
         <Menu.Item
          name= {category.name}
          key={category.name}
          active={activeItem === {sortCategory}}
          onClick={this.handleItemClick}
          as={NavLink}
          to={`/${this.props.currentStore}/collection/${category.name}`}
        />
         ))
        }

      </Menu>
    )
  }
}


export default withRouter(withFirebase(connect(
    mapState,
    actions
  )(firestoreConnect()(SideMenu))));