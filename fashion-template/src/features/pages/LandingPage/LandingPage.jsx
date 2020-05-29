import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Grid, Image, GridRow, Button, Divider, Segment} from "semantic-ui-react";
import _ from "lodash";
import "./LandingPage.css";
import { Helmet } from "react-helmet";
class LandingPage extends Component {

  render() {
    const LandingPageImage_1 = "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding%20Page%201.png?alt=media&token=ac1c37fa-c41a-492e-9862-15b0480bfa61"
    const LandingPageImage_2 = "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding-Page-2.jpg?alt=media&token=13b38209-4990-40f2-bc0a-102a297218da"
    const LandingPageImage_3 = "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding-Page-3.jpg?alt=media&token=8242493d-81ff-450d-88d8-37f272959cbc"
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

        <div className='Info-shopr' >
          <h1 style={{color:'white'}} className='Info-shopr-title' >CREATE YOUR OWN ONLINE FASHION STORE</h1>
          <a href="https://www.shopr.cf/">GET STARTED</a>
        </div>
        <div className='Info-shopr-2'>
        <Segment className='Info-shopr-img'><Image src={LandingPageImage_1}></Image></Segment>
        <Segment className='Info-shopr-img'><Image src={LandingPageImage_2}></Image></Segment>
        <Segment className='Info-shopr-img'><Image src={LandingPageImage_3}></Image></Segment>

        </div>
      </body>
    );
  }
}

export default LandingPage;
