import React, { Component } from 'react'

export default class ChatButton extends Component {

    /*componentDidMount() {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://storage.googleapis.com/mrbot-cdn/webchat-latest.js';
      document.body.appendChild(script);
        WebChat.default.init({
          selector: '#webchat',
          initPayload: `/get_started{"store": "${this.props.storeId}"}`,
          customData: { language: 'en' },
          socketUrl: 'https://rasa.shopr.cf',
          socketPath: '/socket.io/',
          title: 'Title',
          subtitle: 'Subtitle',
        });
      }*/


    render() {

        return (
            <div id="webchat"/>
        )
    }
}

