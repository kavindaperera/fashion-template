import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from "semantic-ui-react";
import StickyBox from "react-sticky-box";
import BasicPage from "./BasicPage";
import AccountPage from "./AccountPage";
import SettingsNav from './SettingsNav';
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../userActions";
import OrdersDashboard from "../../orders/OrdersDashboard/OrdersDashboard";
import NotFound from "../../pages/NotFound/NotFound"

const actions = {
  updatePassword,
  updateProfile
};

const mapState = (state,ownProps) => ({
  auth: state.firebase.auth,
  providerId: state.firebase.auth.isLoaded && state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
  currentStore: ownProps.match.params.store,
});

const SettingsDashboard = ({loading, providerId, auth, user, updateProfile,currentStore}) => {
  return (
    <Grid divided='vertically' columns={2}>
    <Grid.Row>
      <Grid.Column width={12} >
        <Switch>
          <Redirect exact from={`/${currentStore}/my-account`} to={`/${currentStore}/my-account/edit-profile`} />
          <Route path={`/${currentStore}/my-account/edit-profile`} render={() => <BasicPage updateProfile={updateProfile} initialValues={user}/>} />
          <Route path={`/${currentStore}/my-account/edit-profile-facebook`} render={() => <AccountPage providerId={providerId} />}/>
          <Route path={`/${currentStore}/my-account/order-history`} render={() => <OrdersDashboard currentStore={currentStore} user={user} />}/>
          <Route path="*" render={() => <NotFound  />}/>

        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
      <StickyBox offsetTop={70} offsetBottom={20}>
        <SettingsNav currentStore={currentStore}/>
        </StickyBox>
      </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default connect(mapState, actions)(SettingsDashboard);
