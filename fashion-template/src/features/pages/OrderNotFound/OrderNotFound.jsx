import React, { Component } from "react";
import { Grid, Image, GridRow, Button, Icon, Header } from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { Helmet } from "react-helmet";
import "../NotFound/NotFound.css";

class NotFound extends Component {
  render() {
    console.log('404')
    return (
      <body id="error">
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <h1>404</h1>
              <h2>Order not found</h2>
            </div>
            <a href="javascript:history.back()">Go Back</a>
          </div>
        </div>
      </body>
    );
  }
}

export default NotFound;
