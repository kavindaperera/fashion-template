import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Pagination } from "semantic-ui-react";
import ProductList from "../ProductList/ProductList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import SideMenu from '../../slideMenu/SlideMenu/SideMenu'
import StickyBox from "react-sticky-box";
import Filter from "../../filter/Filter/Filter";
import moment from 'moment';
import { Helmet } from "react-helmet";
import _ from "lodash";

const mapState = (state, ownProps) => ({
  products: state.firestore.ordered.items,
  filters: state.filters,
  filteredProducts: state.firestore.ordered.items,
  currentStore: ownProps.match.params.store,
  category: ownProps.match.params.category,
  store: state.firestore.data.selectedStore,
  config: state.firestore.data.config,
  symbol: state.collection.symbol,
});

const actions = { };

const query = ({currentStore}) => {
  return [
    {
      collection:'Stores',
      doc: currentStore,
      subcollections:[{collection: 'Items'}],
      storeAs: 'items',
    }
  ]
}


class CollectionDashboard extends Component {

  state = { };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleChangeSort = e => {
    this.setState({ sort: e });
    this.listProducts();
  };


  checkDiscountStatus = (product) => {
    const dateNow = moment().format('X');
    const startDate = product.discount.startDate.seconds;
    const endDate = product.discount.endDate.seconds;
    return (startDate < dateNow && dateNow < endDate)
  }

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== "") {
        this.props.products.sort((a, b) => 
          state.sort === "lowest"
            ?  a.basePrice > b.basePrice 
            ? 1 : -1
            : {}
        );
        this.props.products.sort((a, b) => 
          state.sort === "highest"
            ?  a.basePrice  < b.basePrice 
            ? 1 : -1
            : {}
        );
        this.props.products.sort((a, b) => 
          state.sort === "atoz"
            ?  a.name && b.name && (a.name) > (b.name) ? 1 : -1
            : {}
        );
        this.props.products.sort((a, b) => 
          state.sort === "ztoa"
            ?  a.name && b.name && (a.name) < (b.name) ? 1 : -1
            : {}
        );

      } else {
        //this.props.products.sort((a, b) => ( a.category && b.category && (a.category) < (b.category) ? 1 : -1));
        this.props.products.sort((a, b) => ( a.rating && b.rating && (a.rating.totalRating/a.rating.ratingCount) < (b.rating.totalRating/b.rating.ratingCount) ? 1 : -1));
      }
      return { filteredProducts: this.props.products };
    });
  };



  render() {
    const { store, products, filteredProducts, currentStore, category, symbol} = this.props;

    let enableRating = false;
    let availability = true;

    if (store){
      enableRating = store.enableRating;
    }

    if (store && (store.categories) ){

      const categories = store.categories;

      let count = 0
      if (category=='all'){
        count += 1
      }
      categories.map(c => {
        if (c.name == category){
          count += 1
        }
      })
      if (count==0){
        availability=false
      }

    }

    if (!isLoaded(products) || isEmpty(products) || !availability) return <LoadingComponent inverted={true} />;



    return (<div>
    {category &&
            <Helmet>
              <title>{_.startCase(category)} | {store.storeName}</title>
            </Helmet>}
        <Grid centered  stackable>
          <Grid.Column width={2}>
            <StickyBox offsetTop={70} offsetBottom={20}>
              <SideMenu  sortCategory={category} currentStore={currentStore}></SideMenu>
            </StickyBox>
          </Grid.Column>
          <Grid.Column width={14}>
           <Filter
              size={this.state.size}
              sort={this.state.sort}
              currentStore={currentStore}
              handleChangeCategory={this.handleChangeCategory}
              handleChangeSort={this.handleChangeSort}
              count={filteredProducts && filteredProducts.length}
              availability = {availability}
            />
            {store && availability &&
            <ProductList
              products={products}
              sortCategory={category}
              store = {store}
              currency = {symbol}
              enableRating={enableRating}
            /> }
          </Grid.Column>
         <Grid.Row>
            <Pagination
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={3}
            />
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid></div>

    );
  }
}


export default connect(
  mapState,
  actions
)(
  firestoreConnect(currentStore => query(currentStore))(
    CollectionDashboard
  )
);
