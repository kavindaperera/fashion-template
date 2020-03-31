import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Image, Menu, Label, Dropdown } from "semantic-ui-react";
import ProductList from "../ProductList/ProductList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import StickyBox from "react-sticky-box";
import { Category } from "emoji-mart";

const mapState = state => ({
  products: state.firestore.ordered.products,
  store: state.firestore.ordered.store,
  loading: state.async.loading,
  currentStore: "7dbDylC8CZTNBPcVPJyn"
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

class CollectionDashboard extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { store, products, loading, currentStore } = this.props;
    const { activeItem } = this.state;

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid stackable>
          <Grid.Column width={2}>
            <StickyBox offsetTop={70} offsetBottom={20}>
              <Menu vertical>
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
            <h5>
              {products && products.length} items sorted by:{" "}
              <Dropdown
                inline
                options={sortOptions}
                defaultValue={sortOptions[0].value}
              />
            </h5>
            <ProductList products={products} />
          </Grid.Column>
          <Grid.Row centered columns={4}>
            <h5>powered by</h5>
            <Image
              src={"/company.png"}
              as="a"
              size="medium"
              href="http://google.com/"
              target="_blank"
            />
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
