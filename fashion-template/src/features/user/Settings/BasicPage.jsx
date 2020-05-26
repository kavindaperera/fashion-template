import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';


class BasicPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile,} = this.props;
        return (
            <div>
            {
            <Helmet>
              <title>Basic Details </title>
            </Helmet>}
            <Segment>
                <Header dividing size='large' content='Basic Details' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                      <label>Gender:</label>
                      <Field
                          name='gender'
                          type='radio'
                          value='female'
                          label='Female'
                          component={RadioInput}
                      />
                      <Field
                          name='gender'
                          type='radio'
                          value='male'
                          label='Male'
                          component={RadioInput}
                      />
                    </Form.Group>
                    <Field
                        name='phoneNumber'
                        placeholder='Phone Number'
                        type='text'
                        component={TextInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' color='black' content='Update Profile'/>
                </Form>
            </Segment></div>
        );
    }
}

export default (reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false})(BasicPage));