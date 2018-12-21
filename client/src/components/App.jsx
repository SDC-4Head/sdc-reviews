/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
// This component is the highest-level app that is responsible for assembling
// each individual component. This is what is ultimately rendered onto the HTML page.
import React from 'react';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import ReviewList from './ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overallRating: 0,
      numberOfReviews: 0,
      reviewBreakdown: {
        accuracy: 5,
        communication: 5,
        cleanliness: 5,
        location: 5,
        checkin: 5,
        value: 5
      }
    };
  }

  render() {
    return (
      <div>
        <ReviewSummary
          overall={this.state.overallRating}
          qtyOfReviews={this.state.numberOfReviews}
        />
        <ReviewBreakdown breakdown={this.state.reviewBreakdown} />
        <ReviewList />
      </div>
    );
  }
}

export default App;
