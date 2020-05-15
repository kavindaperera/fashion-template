  componentDidMount() {
    WebChat.default.init({
      selector: '#webchat',
      initPayload: `/get_started{"store": "${store.id}"}`,
      customData: { language: 'en' },
      socketUrl: 'https://rasa.shopr.cf',
      socketPath: '/socket.io/',
      title: 'Title',
      subtitle: 'Subtitle',
    });
  }

  render() {
    <div id="webchat"/>
  }