import React, { Component } from "react";
import { Grid, Image, GridRow, Button, Icon, Header } from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { Helmet } from "react-helmet";
import "../NotFound/NotFound.css";

class StoreNotVerified extends Component {
  render() {
    //console.log('404')
    return (
      <body id="error">
      <Helmet>
              <title>Store Not Verified | Coming Soon</title>
            </Helmet>
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <h1>SHOPR</h1>
              <h2>Store Not Verified</h2>
            </div>
            <a href="#">Coming Soon</a>
          </div>
        </div>
      </body>
    );
  }
}

export default StoreNotVerified;
