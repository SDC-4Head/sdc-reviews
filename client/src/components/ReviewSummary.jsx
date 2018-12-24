/* eslint-disable react/destructuring-assignment */
// This component is responsible for displaying the highest-level star rating of each airbnb.
import React from 'react';

const ReviewSummary = props => {
  return (
    <div>
      <div id="qtyOfReview">{props.ratings.quantity} Reviews</div>
      <div>Todo: render stars</div>
    </div>
  )
};

export default ReviewSummary;
