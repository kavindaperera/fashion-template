import React, { Component } from "react";
import { Menu, Container, Dropdown, Visibility, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";

const sortOptions = [
  {
    key: "Recommended",
    text: "Recommended",
    value: ""
  },
  {
    key: "Price: Low to High",
    text: "Price: Low to High",
    value: "lowest"
  },
  {
    key: "Price: High to Low",
    text: "Price: High to Low",
    value: "highest"
  }
];

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "1em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease"
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "1px solid #fff",
  marginTop: "4em"
};

const mapState = state => ({
  store: state.firestore.ordered.store,
  loading: state.async.loading,
  currentStore: state.store.currentStore
});

const actions = {};

class Filter extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false
  };

  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  handleChange = (e, { value }) => {
    this.setState({ value });
    this.props.handleChangeSort(value);
  };

  render() {
    const { store, loading, currentStore } = this.props;
    const { menuFixed, value } = this.state;
    console.log(value);
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        {/*<Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >*/}
        {store &&
        store.map(
          s =>
            s.id === currentStore && (
        <Menu key={s.id}
          borderless
          fixed={menuFixed ? "top" : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container fluid className="nav">
          <Menu.Menu position="left" >
          {s.categories &&
                    s.categories.map(category => (
                      <Button key={category} color='black' onClick={e =>this.props.handleChangeCategory(e.target.value)} value={category} >{_.capitalize(category)}</Button>
                    ))}

          </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item>{this.props.count} items sorted by:</Menu.Item>
              <Menu.Item>
                <Dropdown
                  placeholder={sortOptions[0].text}
                  inline
                  options={sortOptions}
                  onChange={this.handleChange}
                  value={value}
                />{" "}
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>

        ))}
      </div>
    );
  }
}


export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "store" }])(Filter));