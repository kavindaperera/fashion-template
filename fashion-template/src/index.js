import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
import "./index.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/util/ScrollToTop";
import 'semantic-ui-less/semantic.less'

import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore'; 
import firebase, { rrfConfig } from './app/store/configureStore';

const store = configureStore();

const rootEl = document.getElementById("root");



let render = () => {
  ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <ReduxToastr
              position="bottom-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
            />
            <App />
          </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

/*store.firebaseAuthIsReady.then(() => {
  render();
});*/

store.firebaseAuthIsReady.then(() => {
  render();
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
