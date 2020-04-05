import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { connect } from "react-redux";
import { withFirebase, firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import { getStore } from '../../store/storeActions'


const mapState = (state, ownProps) => ({
    store: state.firestore.data.selectedStore,
    loading: state.async.loading,
    //category: ownProps.match.params
    currentStore: ownProps.match.params.store
  });

  const actions = {};

  /*const query = ({currentStore}) => {
    return [
      {
        collection:'store',
        doc: currentStore
      }
    ]
  }*/
  

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
        {store &&
         (store.categories && 
         store.categories.map(category => 
         <Menu.Item
          name= {category.name}
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