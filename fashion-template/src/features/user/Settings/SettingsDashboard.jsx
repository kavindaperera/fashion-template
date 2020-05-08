import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from "semantic-ui-react";
import BasicPage from "./BasicPage";
import AccountPage from "./AccountPage";
import SettingsNav from './SettingsNav';
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../userActions";
import OrdersDashboard from "../../orders/OrdersDashboard/OrdersDashboard";

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
    <Grid columns={2}>
    <Grid.Column width={4}>
        <SettingsNav currentStore={currentStore}/>
      </Grid.Column>
      <Grid.Column >
        <Switch>
          <Redirect exact from={`/${currentStore}/my-account`} to={`/${currentStore}/my-account/edit-profile`} />
          <Route path={`/${currentStore}/my-account/edit-profile`} render={() => <BasicPage updateProfile={updateProfile} initialValues={user}/>} />
          <Route path={`/${currentStore}/my-account/edit-profile-facebook`} render={() => <AccountPage providerId={providerId} />}/>
          <Route path={`/${currentStore}/my-account/order-history`} render={() => <OrdersDashboard currentStore={currentStore} user={user} />}/>
        </Switch>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState, actions)(SettingsDashboard);
