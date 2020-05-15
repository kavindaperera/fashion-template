import React, { PureComponent } from 'react'

export default class ChatButton extends PureComponent {

    componentDidMount() {
      if ( typeof WebChat !== 'undefined'){
        window.WebChat.default.init({
          selector: '#webchat',
          initPayload: `/get_started{"store": "${this.props.storeId}"}`,
          customData: { language: 'en' },
          socketUrl: 'https://rasa.shopr.cf',
          socketPath: '/socket.io/',
          title: 'Title',
          subtitle: 'Subtitle',
        });
      }
   }


    render() {

        return (
            <div id="webchat"/>
        )
    }
}

