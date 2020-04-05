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
import NotFound from '../../features/pages/NotFound'

class App extends Component {
  render() {
    return (
      <div>
      <ModalManager/>
        <Switch>
          <Route exact path={`/:store/`} component={HomePage} />
        </Switch>
        <Route
          path="/:store/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Grid className="main">
                <Switch>
                <Route path={`/:store/collection/product/:id`} component={ProductDetailedPage} />
                <Route path={`/:store/collection/:category`}  component={CollectionDashboard} />
                <Route path={`/:store/my-account`} component={SettingsDashboard} />
                <Route path={`/:store/cart`} component={CartDashboard} />
                <Route path={`/:store/error`} component={NotFound} />
                </Switch>
              </Grid>
              <Footer/>
            </div>
          )}
        />
        {/*<Footer/>*/}
      </div>
    );
  }
}

export default App;
