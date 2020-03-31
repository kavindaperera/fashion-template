import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import CollectionDashboard from '../../features/collection/CollectionDashboard/CollectionDashboard'
import NavBar from "../../features/nav/NavBar/NavBar";
import ProductDetailedPage from '../../features/collection/ProductDetailed/ProductDetailedPage'
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard'
import HomePage from "../../features/store/HomePage";
import CartDashboard from '../../features/cart/CartDashboard/CartDashboard'
import ModalManager from '../../features/modals/ModalManager'
import Footer from "../../features/footer/Footer";

class App extends Component {
  render() {
    return (
      <div>
      <ModalManager/>
        <Switch>
          <Route exact path={`/`} component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Grid className="main">
                <Switch>
                <Route path={`/collection`}  component={CollectionDashboard} />
                <Route path={`/product/:id`} component={ProductDetailedPage} />
                <Route path={`/my-account`} component={SettingsDashboard} />
                <Route path={`/cart`} component={CartDashboard} />
                </Switch>
              </Grid>
            </div>
          )}
        />
        <Footer/>
      </div>
    );
  }
}

export default App;
