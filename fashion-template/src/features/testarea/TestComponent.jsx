import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { openModal } from "../modals/modalActions";

const mapState = (state, ownProps) => ({
  currentStore: ownProps.match.params.store,
});

const actions = {
  openModal,
};

const product = {

  id: "3ThrjM4KKtEsvfq3dXUV",
  attributes: [],
  basePrice: 375,
  category: 6,
  deleted: false,
  description:
    "Adorned with its abstract multicoloured print, the Antonia dress is both free-spirited and refined. Crafted into a relaxed silhouette, it’s minimal shape features a waist tie and pleated detailing. Find the perfect pairing in our new arrivals. ",
  discount: {
    endDate: {
      seconds: 1593459240,
      nanoseconds: 0,
    },
    percentage: 25,
    startDate: {
      seconds: 1590262488,
      nanoseconds: 8000000,
    },
  },
  name: "ANTONIA PRINTED MINI DRESS",
  photos: [
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_t132gppidj.png?alt=media&token=79e53c97-0813-414e-b93f-16d28ca2fb87",
      title: "t132gppidj",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Ft132gppidj.jpg?alt=media&token=737d1004-b104-40a9-8e27-8fd5a220a162",
    },
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_43oqukqdxmx.png?alt=media&token=3966d969-9c6c-4262-a652-64ced8c5cab1",
      title: "43oqukqdxmx",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2F43oqukqdxmx.jpg?alt=media&token=0c22bfaa-22c8-4d7e-b298-32c5b720f17e",
    },
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_t8ke0p3h3if.png?alt=media&token=3eda3022-71b6-4109-aa9b-6c801f05dd91",
      title: "t8ke0p3h3if",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Ft8ke0p3h3if.jpg?alt=media&token=797d1e13-a37f-4c0c-bfe6-b75b6a67b5e5",
    },
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_pkg7ux1qr49.png?alt=media&token=aee0fbe6-67ec-4784-9c67-00db6a2c6b55",
      title: "pkg7ux1qr49",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fpkg7ux1qr49.jpg?alt=media&token=77d39ac6-4dea-4782-a379-fb41af3bdacb",
    },
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_8j2nqph3rmc.png?alt=media&token=453718b4-714a-4eb5-88aa-7f1c04f09a5a",
      title: "8j2nqph3rmc",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2F8j2nqph3rmc.jpg?alt=media&token=5d977f8a-1329-4c8c-9729-3ad2dbbcc14a",
    },
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_rcjbvamm7p.png?alt=media&token=bdbe4472-152f-47e4-8181-780eddb0c7d1",
      title: "rcjbvamm7p",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Frcjbvamm7p.jpg?alt=media&token=38aae9d0-2019-470c-b2b8-bb9248c30625",
    },
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fthumb_s8s4bggku4.png?alt=media&token=54a08fba-dfc3-40d5-ba01-d4b5f64535d8",
      title: "s8s4bggku4",
      url:
        "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/h2ATRQ2iriV9v2bBaOYqcu0U3Nw1%2FItems%2Fs8s4bggku4.jpg?alt=media&token=44ce7429-6ac2-40bd-9917-a56e07f539e0",
    },
  ],
  rating: {
    ratingCount: 0,
    totalRating: 0,
  },
  reviews: [],
  subItems: [
    {
      price: 350,
      stock: null,
      variants: ["Black", "4"],
    },
    {
      price: 375,
      stock: 1,
      variants: ["Black", "6"],
    },
    {
      price: 375,
      stock: 1,
      variants: ["Black", "8"],
    },
    {
      price: 385,
      stock: 1,
      variants: ["Black", "10"],
    },
    {
      price: 385,
      stock: 0,
      variants: ["Black", "12"],
    },
    {
      price: 395,
      stock: 1,
      variants: ["Black", "14"],
    },
  ],
  variants: [
    {
      attributes: [
        {
          attribute: "Black",
        },
      ],
      title: "color",
    },
    {
      attributes: [
        {
          attribute: "4",
        },
        {
          attribute: "6",
        },
        {
          attribute: "8",
        },
        {
          attribute: "10",
        },
        {
          attribute: "12",
        },
        {
          attribute: "14",
        },
      ],
      title: "size",
    },
  ],
  visible: true,
};

class TestComponent extends Component {
  render() {
    const { openModal, currentStore } = this.props;

    return (
      <div>
        <h1>Test Area</h1>
        <Button
          onClick={() =>
            openModal("QuickViewModal", { product: product , currentStore: currentStore})
          }
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
