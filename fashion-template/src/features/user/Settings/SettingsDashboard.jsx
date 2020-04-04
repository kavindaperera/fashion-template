import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import BasicPage from "./BasicPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../userActions";

const actions = {
  updatePassword,
  updateProfile
};

const mapState = state => ({
  auth: state.firebase.auth,
  providerId: state.firebase.auth.isLoaded && state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const SettingsDashboard = ({updatePassword,providerId, auth, user, updateProfile}) => {
  console.log(user)
  return (
    <Grid stackable columns={2}>
      <Grid.Column width={8}>
        <BasicPage updateProfile={updateProfile} initialValues={user} />
      </Grid.Column>
      <Grid.Column width={8}>
        <AccountPage updatePassword={updatePassword} providerId={providerId} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState, actions)(SettingsDashboard);
