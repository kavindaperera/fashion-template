import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Header, Pagination } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProductList from "../ProductList/ProductList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import StickyBox from "react-sticky-box";
import Filter from "../../filter/Filter/Filter";

const mapState = state => ({

  products: state.firestore.ordered.items,
  store: state.firestore.ordered.store,
  filters: state.filters,
  filteredProducts: state.firestore.ordered.items,
  currentStore: state.store.currentStore
});

const actions = {
};

const query = ({currentStore}) => {
  return [
    {
      collection:'store',
      doc: currentStore,
      subcollections:[{collection: 'items'}],
      storeAs: 'items'
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

  /*componentDidMount() {
    this.props.getProducts();
  }*/

  state = { sortCategory: "" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleChangeSort = e => {
    console.log(e);
    this.setState({ sort: e });
    this.listProducts();
  };

  handleChangeCategory = e => {
    this.setState({ category: e });
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
      if (state.category !== "") {
        this.setState({ sortCategory: state.category });
        /*filteredProducts: this.props.products.filter(a =>
          (a.category.indexOf(state.category)>=0) ),*/
      } else {
        this.props.products.sort((a, b) => (a, b));
      }
      return { filteredProducts: this.props.products };
    });
  };

  render() {
    const {
      products,
 
      filteredProducts,
      currentStore
    } = this.props;
    const { activeItem, sortCategory } = this.state;
    console.log('XXX',{currentStore})

    //console.log("STORE", { store });

    if (!isLoaded(products) || isEmpty(products)) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column width={2}>
            <StickyBox offsetTop={70} offsetBottom={20}>
              <Header>MENU HERE</Header>
            </StickyBox>
          </Grid.Column>
          <Grid.Column width={14}>
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeCategory={this.handleChangeCategory}
              handleChangeSort={this.handleChangeSort}
              count={filteredProducts && filteredProducts.length}
            />
            <ProductList
              products={products}
              sortCategory={sortCategory}
            />
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

/*export default connect(
  mapState,
  actions
)(
  firestoreConnect([{ collection: "products" }, { collection: "store", where: [['storeId', '==', "7dbDylC8CZTNBPcVPJyn"]], }])(
    CollectionDashboard
  )
);*/

export default connect(
  mapState,
  actions
)(
  firestoreConnect(currentStore => query(currentStore))(
    CollectionDashboard
  )
);
