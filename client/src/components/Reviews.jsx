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

  getRatings(path) {
    $.ajax({
      url: `/api/ratings${path}`,
      type: 'GET',
      dataType: 'json',
      success: data => {
        this.setState({
          ratings: data
        });
        console.log(data);
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
