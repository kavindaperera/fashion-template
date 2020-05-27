import React, { Component } from 'react';
import {
    Button
  } from "semantic-ui-react";
import PhotoZoom from '../pages/PhotoZoom/PhotoZoom'

const photos = [
    {
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Fthumb_4tp84c7lktq.png?alt=media&token=6170f5eb-a877-4b12-b675-64e28bd4f5f0",
      "title": "4tp84c7lktq",
      "url": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2F4tp84c7lktq.jpg?alt=media&token=ab9e46ab-8dbe-42c2-9536-0cd3fbf1965e"
    },
    {
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Fthumb_9vvu06zw9iu.png?alt=media&token=ec850971-b3aa-4f14-a837-6e9abeaffb76",
      "title": "9vvu06zw9iu",
      "url": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2F9vvu06zw9iu.jpg?alt=media&token=e92529d1-44a2-43cc-8f94-101f5426aeba"
    },
    {
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Fthumb_rnf1r6oxkb.png?alt=media&token=82f9a188-4f3d-4f61-80b6-53db393e289f",
      "title": "rnf1r6oxkb",
      "url": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Frnf1r6oxkb.jpg?alt=media&token=58e2d139-d0d7-4ba9-9e76-dc62fcd1ea79"
    },
    {
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Fthumb_kij99lc0b3b.png?alt=media&token=a5e24b99-43ad-458d-bebe-ca48807faa22",
      "title": "kij99lc0b3b",
      "url": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Fkij99lc0b3b.jpg?alt=media&token=7a24f579-572e-45ad-815c-5563900b936a"
    },
    {
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2Fthumb_5m3vodlzutw.png?alt=media&token=99e67d30-b7f8-40ca-851e-908ed2027068",
      "title": "5m3vodlzutw",
      "url": "https://firebasestorage.googleapis.com/v0/b/ecom-cse.appspot.com/o/rRTaztATW5R03ougKLtzWHr5V1g2%2FItems%2F5m3vodlzutw.jpg?alt=media&token=7e346dee-27a7-44f3-8a58-ad5ac5dd1b24"
    }
  ]


class TestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          zoom: false
        };
      }

    handleZoomClick = () => this.setState({ zoom: true});

    handleCloseClick = () => this.setState({ zoom: false});


    render() {

        console.log(this.state.zoom)

        if (this.state.zoom==true){
            return (
                <div>
                    <PhotoZoom handleCloseClick={this.handleCloseClick}  photos={photos}/>
                </div>
        );
        }


        return (
                <div>
                    <Button color='teal' onClick={this.handleZoomClick}>Open Photo Zoom</Button>
                    <br></br>
                    <br></br>
                </div>
        );
    }
};

export default TestComponent