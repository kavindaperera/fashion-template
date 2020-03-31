import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import { registerUser } from '../authActions';
import { combineValidators, isRequired } from 'revalidate';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions =  {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('display name'),
  email: isRequired('email'),
  password: isRequired('password')
})

const RegisterForm = ({handleSubmit, registerUser}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
        <SocialLogin/>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form:'registerForm', validate})(RegisterForm));