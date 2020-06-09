import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Grid, Image, GridRow, Button, Tab, Segment } from "semantic-ui-react";
import _ from "lodash";
import "./LandingPage.css";
import { Helmet } from "react-helmet";
class LandingPage extends Component {
  render() {
    const LandingPageImage_1 =
      "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding%20Page%2FHome.png?alt=media&token=9bc262e5-2a69-456a-8216-e22a6f99a543";
    const LandingPageImage_2 =
      "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding%20Page%2FCatalog.png?alt=media&token=8921581f-6fa8-4ac7-ba78-0a2ef9dd6fa8";
    const LandingPageImage_3 =
      "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding%20Page%2FChatbot.png?alt=media&token=7dc969be-7cce-4c4c-a769-a6cad2426e90";
    const LandingPageImage_4 =
      "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding%20Page%2FCart.png?alt=media&token=096d1687-ef2d-43b0-acce-294530569ac6";
    const LandingPageImage_5 = 
      "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/fashion-template%2FLanding%20Page%2FLookbook.png?alt=media&token=0bb1169a-0714-47d3-b97a-86599ac3fc0a";

    const panes = [
      {
        menuItem: "Home",
        render: () => (
          <Tab.Pane className='landing-pane' attached={false}>
            <Segment className="Info-shopr-img">
              <Image src={LandingPageImage_1}></Image>
            </Segment>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Product Catalog",
        render: () => (
          <Tab.Pane className='landing-pane' style={{ fontFamily: "Lato" }} attached={false}>
            <Segment className="Info-shopr-img">
              <Image src={LandingPageImage_2}></Image>
            </Segment>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "AI Assistant",
        render: () => (
          <Tab.Pane className='landing-pane' attached={false}>
            <Segment className="Info-shopr-img">
              <Image src={LandingPageImage_3}></Image>
            </Segment>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Cart",
        render: () => (
          <Tab.Pane className='landing-pane' attached={false}>
            <Segment className="Info-shopr-img">
              <Image src={LandingPageImage_4}></Image>
            </Segment>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "LookBook",
        render: () => (
          <Tab.Pane className='landing-pane' attached={false}>
            <Segment className="Info-shopr-img">
              <Image src={LandingPageImage_5}></Image>
            </Segment>
          </Tab.Pane>
        ),
      },
    ];

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

        <div className="Info-shopr">
          <h1 style={{ color: "white" }} className="Info-shopr-title">
            CREATE YOUR OWN ONLINE FASHION STORE
          </h1>
          <a href="https://www.shopr.cf/">GET STARTED</a>
        </div>
        <div className="Info-shopr-2">
          <Tab
            className='landing-page-tabs'
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </div>
      </body>
    );
  }
}

export default LandingPage;
