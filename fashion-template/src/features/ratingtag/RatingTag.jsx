import React from "react";
import { Rating } from "semantic-ui-react";
function RatingTag({ enableRating, rating }) {
  return (
    <div>
      {enableRating && rating > 0 && (
        <Rating disabled defaultRating={rating} maxRating={5} />
      )}
      {enableRating && rating == 0 && (
        <p style={{ color: "grey" }}>still not rated</p>
      )}
    </div>
  );
}

export default RatingTag;
