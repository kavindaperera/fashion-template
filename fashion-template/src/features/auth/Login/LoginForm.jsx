import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment} from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import { login, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  login, 
  socialLogin
}

const LoginForm = ({login, socialLogin, handleSubmit, error}) => {
  return (
    <Form onSubmit={handleSubmit(login)} error size="large">
      <Segment>
        <SocialLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  );
};

export default connect(null, actions)(reduxForm({form:'loginFrom'})(LoginForm));