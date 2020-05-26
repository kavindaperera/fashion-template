import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Helmet } from "react-helmet";

const Account = ({ error, invalid, submitting, handleSubmit, updatePassword, providerId, }) => {
  return (
    <div>
    {
            <Helmet>
              <title>Account Details </title>
            </Helmet>
    }
    <Segment>
    
      <Header dividing size="large" content="Account Details" />
      {providerId && providerId==='facebook.com' &&
      <div>
        <p>Please visit Facebook to update your account settings</p>
        <Button type="button"  color="black" href='https://www.facebook.com'>
          <Icon name="facebook" />
          Go to Facebook
        </Button>
      </div>}
    </Segment></div>
  );
};

export default (Account);