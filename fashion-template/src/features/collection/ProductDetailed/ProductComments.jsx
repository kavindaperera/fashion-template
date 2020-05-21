import React, { Component } from "react";
import { Rating , Header, Comment } from "semantic-ui-react";

export default class ProductComments extends Component {
  render() {
    const { reviews } = this.props;

    return (
      <Comment.Group threaded>
        <Header as="h4" dividing>
          Product Reviews
        </Header>
        {reviews.length==0 && <p> Still Not Rated </p>}

        {reviews &&
          reviews.map((review) => (
            <Comment>
              <Comment.Avatar
                as="a"
                src={review.photoURL}
              />
              <Comment.Content>
                <Comment.Author as="a"> <Rating defaultRating={review.rating} maxRating={5} disabled /></Comment.Author>
                <Comment.Text>{review.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
      </Comment.Group>
    );
  }
}
