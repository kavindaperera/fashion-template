import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Pagination } from "semantic-ui-react";
import ProductList from "../ProductList/ProductList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import SideMenu from '../../slideMenu/SlideMenu/SideMenu'
import StickyBox from "react-sticky-box";
import Filter from "../../filter/Filter/Filter";

const mapState = (state, ownProps) => ({
  products: state.firestore.ordered.items,
  filters: state.filters,
  filteredProducts: state.firestore.ordered.items,
  currentStore: ownProps.match.params.store,
  category: ownProps.match.params.category,
  store: state.firestore.data.selectedStore,
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


const sizes = [
  { key: "xxs", text: "XXS", value: "xxs" },
  { key: "xs", text: "XS", value: "xs" },
  { key: "s", text: "S", value: "s" },
  { key: "m", text: "M", value: "m" },
  { key: "l", text: "L", value: "l" },
  { key: "xl", text: "XL", value: "xl" },
  { key: "xxl", text: "XXL", value: "xxl" }
];

class CollectionDashboard extends Component {

  state = { };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleChangeSort = e => {
    console.log(e);
    this.setState({ sort: e });
    this.listProducts();
  };

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== "") {
        this.props.products.sort((a, b) =>
          state.sort === "lowest"
            ? a.price - (a.price * a.discount) / 100 >
              b.price - (b.price * b.discount) / 100
              ? 1
              : -1
            : a.price - (a.price * a.discount) / 100 <
              b.price - (b.price * b.discount) / 100
            ? 1
            : -1
        );
      } else {
        this.props.products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      return { filteredProducts: this.props.products };
    });
  };



  render() {
    const { store, products, filteredProducts, currentStore, category} = this.props;

    console.log('collection',store)

    if (!isLoaded(products) || isEmpty(products)) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column width={2}>
            <StickyBox offsetTop={70} offsetBottom={20}>
              <SideMenu sortCategory={category} currentStore={currentStore}></SideMenu>
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
            />
            {store &&
            <ProductList
              products={products}
              sortCategory={category}
              store = {store}
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
        </Grid>
      </div>
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
