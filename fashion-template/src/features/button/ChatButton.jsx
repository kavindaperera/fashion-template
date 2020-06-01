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
          title: 'AI Assistant',
          storage: 'session',
          subtitle: 'Shopr',
          InputTextFieldHint: 'Type a message...'
        });
        window.WebChat.send(`/set_id{"store":"${this.props.storeId}"}`)
      }
   }


    render() {

        return (
            <div id="webchat"/>
        )
    }
}

