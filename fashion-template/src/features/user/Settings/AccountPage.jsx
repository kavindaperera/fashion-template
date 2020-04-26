import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';


const Account = ({ error, invalid, submitting, handleSubmit, updatePassword, providerId }) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account Details" />
      {providerId && providerId==='facebook.com' &&
      <div>
        <Header color="teal" sub content="Facebook Account" />
        <p>Please visit Facebook to update your account settings</p>
        <Button type="button"  color="facebook">
          <Icon name="facebook" />
          Go to Facebook
        </Button>
      </div>}
    </Segment>
  );
};

export default (Account);