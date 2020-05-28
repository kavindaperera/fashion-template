import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from "lodash";
import "./LandingPage.css";
import { Helmet } from "react-helmet";
class LandingPage extends Component {
  render() {
    return (
      <body id="landing">
        <div className="title-shopr">
          <h1 className="shopr">
            SHOPR
            <br />
            FASHION
          </h1>
        </div>
        <div class="wrapper">
          <div class="letters">
            <span class="letter">f</span>
            <span class="letter">a</span>
            <span class="letter">s</span>
            <span class="letter">h</span>
            <span class="letter">i</span>
            <span class="letter">o</span>
            <span class="letter">n</span>
            <span class="letter">.</span>
            <span class="letter">s</span>
            <span class="letter">h</span>
            <span class="letter">o</span>
            <span class="letter">p</span>
            <span class="letter">r</span>
            <span class="letter">.</span>
            <span class="letter">c</span>
            <span class="letter">f</span>
          </div>
        </div>
      </body>
    );
  }
}

export default LandingPage;
