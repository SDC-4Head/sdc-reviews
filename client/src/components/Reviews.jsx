/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
// This component is the highest-level app that is responsible for assembling
// each individual component. This is what is ultimately rendered onto the HTML page.
import React from 'react';
import $ from 'jquery';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import ReviewList from './ReviewList.jsx';
// eslint-disable-next-line no-unused-vars
import styles from '../styles/App.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {}
    };
  }

  componentDidMount() {
    this.getRatings(window.location.pathname + window.location.search);
  }

  calculateAverageRating (allReviews) {
    const ratings = {
      quantity: allReviews.length,
      overall: 0,
      accuracy: 0,
      communication: 0,
      cleanliness: 0,
      location: 0,
      checkin: 0,
      value: 0
    };

    allReviews.forEach(review => {
      ratings.accuracy = (ratings.accuracy + review.accuracy) / 2;
      ratings.communication = (ratings.communication + review.communication) / 2;
      ratings.cleanliness = (ratings.cleanliness + review.cleanliness) / 2;
      ratings.location = (ratings.location + review.location) / 2;
      ratings.checkin = (ratings.checkin + review.checkin) / 2;
      ratings.value = (ratings.value + review.value) / 2;
    });

    ratings.overall =
      (ratings.accuracy +
        ratings.communication +
        ratings.cleanliness +
        ratings.location +
        ratings.checkin +
        ratings.value) /
      6;

    const roundToHalfValue = () => {
      ratings.accuracy = Math.round(ratings.accuracy * 2) / 2;
      ratings.communication = Math.round(ratings.communication * 2) / 2;
      ratings.cleanliness = Math.round(ratings.cleanliness * 2) / 2;
      ratings.location = Math.round(ratings.location * 2) / 2;
      ratings.checkin = Math.round(ratings.checkin * 2) / 2;
      ratings.value = Math.round(ratings.value * 2) / 2;
      ratings.overall = Math.round(ratings.overall * 2) / 2;
    };

    roundToHalfValue();
    return ratings;
  }

  getRatings(path) {
    $.ajax({
      url: `/api/ratings${path}`,
      type: 'GET',
      dataType: 'json',
      success: data => {
        const averageRatings = this.calculateAverageRating(data);
        this.setState({
          ratings: averageRatings
        });
      },
      error: err => {
        throw err;
      }
    });
  }

  render() {
    return (
      <div className="reviewsService">
        <ReviewSummary ratings={this.state.ratings} />
        <ReviewBreakdown ratings={this.state.ratings} />
        <ReviewList reviewQty={this.state.ratings.quantity} />
      </div>
    );
  }
}

export default Reviews;
