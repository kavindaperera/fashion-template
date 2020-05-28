import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Label,} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import TextInput from "../../app/common/form/TextInput";
import RatingInput from "../../app/common/form/RatingInput";
import { closeModal } from "../modals/modalActions";
import { shareReview } from '../review/reviewAction'

const actions = {
  shareReview
};

const validate = combineValidators({
  rating: isRequired("rating"),
  comment: composeValidators(isRequired("comment"),hasLengthGreaterThan(4)({
    message: 'comment needs to be at least 5 characters'
  }))(),
});

class ReviewForm extends Component {

    onFormSubmit = values => {
        if (this.props.data){
          const currentStore = this.props.data.currentStore;
          const item = this.props.data.item;
          this.props.shareReview(values,item,currentStore)
        }
      };


  render() {
    const { closeModal, handleSubmit, error, invalid, submitting, data } = this.props;

    //console.log(data.loading)
    
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
              disabled={invalid || submitting || data.loading}
              loading = {data.loading}
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
)(reduxForm({ form: "reviewForm", validate })(ReviewForm));
