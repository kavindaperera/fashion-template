import React, { Component } from "react";
import {
  Menu,
  Container,
  Dropdown,
} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { connect } from "react-redux";




const sortOptions = [
  {
    key: "Recommended",
    text: "Recommended",
    value: "",
  },
  {
    key: "Price: Low to High",
    text: "Price: Low to High",
    value: "lowest",
  },
  {
    key: "Price: High to Low",
    text: "Price: High to Low",
    value: "highest",
  },
  {
    key: "Name: A-Z Order",
    text: "Name: A-Z Order",
    value: "atoz",
  },
  {
    key: "Name: Z-A Order",
    text: "Name: Z-A Order",
    value: "ztoa",
  },
];



const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "1em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "1px solid #fff",
  marginTop: "4em",
};

const mapState = (state, ownProps) => ({
  store: state.firestore.data.selectedStore,
  loading: state.async.loading,
});

const actions = {};

class Filter extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  handleChange = (e, { value }) => {
    this.setState({ value });
    console.log(value)
    this.props.handleChangeSort(value);
  };

  render() {
    const { loading} = this.props;
    const { menuFixed, value } = this.state;
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>

                <Menu
                  borderless
                  fixed={menuFixed ? "top" : undefined}
                  style={menuFixed ? fixedMenuStyle : menuStyle}
                >
                  <Container fluid className="nav">
                    <Menu.Menu position="left">
                      <Menu.Item>showing {this.props.showLength} of {this.props.fullLength} available styles</Menu.Item>

                    </Menu.Menu>
                    <Menu.Menu position="right">
                      <Menu.Item>{this.props.fullLength} items sort By:</Menu.Item>
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
      </div>
    );
  }
}

export default connect(mapState,actions)(Filter);
