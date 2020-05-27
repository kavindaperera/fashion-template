import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from "lodash";
import "./NotFound.css";
import { Helmet } from "react-helmet";
class NotFound extends Component {
  render() {
    //console.log('404')
    return (
      <body id="error">
            <Helmet>
              <title>Error 404</title>
            </Helmet>
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <h1>404</h1>
              <h2>Page not found</h2>
            </div>
            <a href="javascript:history.back()">Go Back</a>
          </div>
        </div>
      </body>
    );
  }
}

export default NotFound;
