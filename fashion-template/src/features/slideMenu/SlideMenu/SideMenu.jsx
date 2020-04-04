import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { connect } from "react-redux";
import { withFirebase, firestoreConnect } from "react-redux-firebase";
import _ from "lodash";


const mapState = (state, ownProps) => ({
    store: state.firestore.ordered.store,
    loading: state.async.loading,
    //category: ownProps.match.params
  });

  const actions = {};


class SideMenu extends Component {
  state = { activeItem: '' }

  handleItemClick = (e,  {name} ) => this.setState({ activeItem: name })

  render() {
    const { store, loading, sortCategory } = this.props;
    const { activeItem } = this.state

    return (
      <Menu pointing secondary vertical>
      <Menu.Item header>CATEGORY</Menu.Item>
      <Menu.Item
          name= "All"
          active={activeItem === {sortCategory}}
          onClick={this.handleItemClick}
          as={NavLink}
          to={`/${this.props.currentStore}/collection/all`}
        />
        {store && store.map(s => s.id === this.props.currentStore &&
         (s.categories &&
         s.categories.map(category =>

         <Menu.Item
          name= {category}
          active={activeItem === {sortCategory}}
          onClick={this.handleItemClick}
          as={NavLink}
          to={`/${this.props.currentStore}/collection/${category}`}
        />
         ))
        )}
 
      </Menu>
    )
  }
}


export default withFirebase(connect(
    mapState,
    actions
  )(firestoreConnect([{ collection: "store" }])(SideMenu)));