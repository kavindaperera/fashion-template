import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  isOneOf,
} from "revalidate";
import TextInput from "../../app/common/form/TextInput";
import RatingInput from "../../app/common/form/RatingInput";
import { closeModal } from "../modals/modalActions";

const actions = {
  closeModal,
};

const validate = combineValidators({
  rating: isRequired("rating"),
  comment: isRequired("comment"),
});

class ReviewForm extends Component {


    onFormSubmit = values => {
        console.log(values)
      };
  render() {
    const { closeModal, handleSubmit, error, invalid, submitting } = this.props;

    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onFormSubmit)}>
            <Field
              name="rating"
              type="text"
              component={RatingInput}
              placeholder="Rating"
            />
            <Field
              name="comment"
              type="text"
              component={TextInput}
              placeholder="Comment"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Button
              disabled={invalid || submitting}
              fluid
              size="large"
              color="black"
            >
              Share Review
            </Button>
          
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(reduxForm({ form: "reviewrForm", validate })(ReviewForm));
