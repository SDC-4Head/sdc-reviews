/* eslint-disable react/destructuring-assignment */
// This component is responsible for displaying the highest-level star rating of each airbnb.
import React from 'react';
import styles from '../styles/ReviewSummary.css';

const ReviewSummary = props => {
  return (
    <div id="summaryContainer">
      <div id="qtyOfReview">{props.ratings.quantity} Reviews</div>
      <div id="summaryStars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    </div>
  )
};

export default ReviewSummary;
