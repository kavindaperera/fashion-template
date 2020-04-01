import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid,  Menu, Dropdown } from "semantic-ui-react";
import ProductList from "../ProductList/ProductList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import StickyBox from "react-sticky-box";
import Filter from '../../filter/Filter/Filter'

const mapState = state => ({
  /*products:getVisibleproducts(state.firestore.ordered.products, state.filters),*/
  products: state.firestore.ordered.products,
  /*products:state.products,*/
  store: state.firestore.ordered.store,
  loading: state.async.loading,
  currentStore: state.store.currentStore,
  filters: state.filters,
  filteredProducts: state.firestore.ordered.products,
  
});

const actions = {};

const sortOptions = [
  {
    key: "Recommended",
    text: "Recommended",
    value: "Recommended"
  },
  {
    key: "Price: Low to High",
    text: "Price: Low to High",
    value: "Price: Low to High"
  },
  {
    key: "Price: High to Low",
    text: "Price: High to Low",
    value: "Price: High to Low"
  }
];

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
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleChangeSort = (e) => {
    this.setState({sort: e});
    this.listProducts();
  }

  handleChangeCategory = (e) => {
    this.setState({category: e});
    this.listProducts();
  }

  listProducts= () => {
    this.setState(state => {
      if (state.sort !== ''){
        this.props.products.sort((a,b)=>(state.sort==='lowest') ? ((a.price - (a.price * a.discount) / 100) > (b.price - (b.price * b.discount) / 100) ? 1 : -1) : ((a.price - (a.price * a.discount) / 100) < (b.price - (b.price * b.discount) / 100) ? 1 : -1))  
      } else {
        this.props.products.sort((a,b)=>(a.id<b.id?1:-1));
      }
      if (state.category!==""){
        return {
          filteredProducts: this.props.products.filter(a =>
            (a.category.indexOf(state.category)===0))
        }
      }
      return {filteredProducts: this.props.products};
    })
  }


  render() {
    const { store, products, loading, currentStore, filteredProducts } = this.props;
    const { activeItem } = this.state;

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid stackable>
          <Grid.Column width={2}>
            <StickyBox offsetTop={70} offsetBottom={20}>
              <Menu borderless vertical>
                <Menu.Item>
                  <Menu.Header>All Clothing</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Womens</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      name="denim"
                      active={activeItem === "denim"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="jackets & coats"
                      active={activeItem === "jackets & coats"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="dresses"
                      active={activeItem === "dresses"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="sweaters"
                      active={activeItem === "sweaters"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="skirts"
                      active={activeItem === "skirts"}
                      onClick={this.handleItemClick}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Mens</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      name="denim"
                      active={activeItem === "denim"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="jackets & coats"
                      active={activeItem === "jackets & coats"}
                      onClick={this.handleItemClick}
                    />
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
            </StickyBox>
          </Grid.Column>
          <Grid.Column width={14}>
          <Filter size={this.state.size} sort={this.state.sort} handleChangeCategory={this.handleChangeCategory} handleChangeSort={this.handleChangeSort} count={filteredProducts && filteredProducts.length} />
            {/*<h5>
              {products && products.length} items sorted by:{" "}
              <Dropdown
                inline
                options={sortOptions}
                defaultValue={sortOptions[0].value}
              />
              <select onChange={(e) => this.props.filterSort(e.target.value)}>
                        <option value="">Sorting items</option>
                        <option value="HighToLow">Price: High to Low</option>
                        <option value="LowToHigh">Price: Low to High</option>
                        <option value="Newest">Newest Items</option>
                    </select>
            </h5>*/}
            <ProductList products={products} currentStore={currentStore} />
          </Grid.Column>
          <Grid.Row>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect([{ collection: "products" }, { collection: "store" }])(
    CollectionDashboard
  )
);
