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
import NotFound from '../../features/pages/NotFound/NotFound'
import LandingPage from '../../features/pages/LandingPage/LandingPage'
import TestComponent from '../../features/testarea/TestComponent';
import OrderDetailedPage from '../../features/orders/OrderDetailed/OrderDetailedPage'
import LookBook from '../../features/pages/LookBook/LookBook'
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

class App extends Component {
  render() {
    return (
      <div>
      <ModalManager/>
        <Switch>
          <Route exact path={`/`} component={LandingPage}/>
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
                {/*<Route path="/:store/test" component={TestComponent} />*/}
                <Route path="/:store/lookbook" component={LookBook} />
                <Route path={`/:store/collection/:category`}  component={CollectionDashboard} />
                <Route path={`/:store/my-account`} component={UserIsAuthenticated(SettingsDashboard)} />
                <Route path={`/:store/order-detailed/:id`} component={UserIsAuthenticated(OrderDetailedPage)} />
                <Route path={`/:store/cart`} component={UserIsAuthenticated(CartDashboard)} />
                <Route exact path="*" component={NotFound} />
                </Switch>
              </Grid>
              <Footer/>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
