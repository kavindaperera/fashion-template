import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import CollectionDashboard from '../../features/collection/CollectionDashboard/CollectionDashboard'
import NavBar from "../../features/nav/NavBar/NavBar";
import ProductDetailedPage from '../../features/collection/ProductDetailed/ProductDetailedPage'
import HomePage from "../../features/store/HomePage";
import ModalManager from '../../features/modals/ModalManager'

class App extends Component {
  render() {
    return (
      <div>
      <ModalManager/>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Grid className="main">
                <Switch>
                <Route path="/collection" component={CollectionDashboard} />
                <Route path="/product/:id" component={ProductDetailedPage} />
                </Switch>
              </Grid>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
