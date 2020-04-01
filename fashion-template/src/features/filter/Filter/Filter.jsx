import React, { Component } from "react";
import { Menu, Container, Dropdown, Visibility } from "semantic-ui-react";

const sortOptions = [
  {
    key: "Recommended",
    text: "Recommended",
    value: ""
  },
  {
    key: "Price: Low to High",
    text: "Price: Low to High",
    value: "highest"
  },
  {
    key: "Price: High to Low",
    text: "Price: High to Low",
    value: "lowest"
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

export default class Filter extends Component {
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
    const { menuFixed, value } = this.state;
    console.log(value);

    return (
      <div>
        {/*<Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >*/}
        <Menu
          borderless
          fixed={menuFixed ? "top" : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container fluid className="nav">
            <Menu.Menu position="left"></Menu.Menu>
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
              <Menu.Item>
                <select
                  className="ui search dropdown"
                  onChange={e =>
                    this.props.handleChangeCategory(e.target.value)
                  }
                >
                  <option value="">ALL</option>
                  <option value="women">WOMEN</option>
                  <option value="men">MEN</option>
                  <option value="Newest">NEW</option>
                </select>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>{" "}
        {/*</Visibility>*/}
      </div>
    );
  }
}
