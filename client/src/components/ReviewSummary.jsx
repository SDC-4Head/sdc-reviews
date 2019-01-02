/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
// This component is responsible for displaying the highest-level star rating of each airbnb.
import React from 'react';
import styles from '../styles/ReviewSummary.css';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderStars(avgRating) {
    const wholeStar = <div className="star"><i className="fas fa-star"></i></div>;
    const halfStar = <div className="star half"><i className="fas fa-star-half-alt"></i></div>;
    const emptyStar = <div className="star empty"><i className="far fa-star"></i></div>;
    const stars = [];

    for (let i = avgRating, j = 0; j < 5; i -= 1, j += 1) {
      if (i >= 1) {
        stars.push(wholeStar);
      } else if (i > 0 && i < 1) {
        stars.push(halfStar);
      } else if (i <= 0) {
        stars.push(emptyStar);
      }
    }
    return stars;
  }

  render() {
    const { ratings } = this.props;
    return (
      <div id="summaryContainer">
        <div id="qtyOfReview">{ratings.quantity} Reviews</div>
        <div id="summaryStars">
          <div>{this.renderStars(ratings.overall)}</div>
        </div>
      </div>
    );
  }
}

export default ReviewSummary;
