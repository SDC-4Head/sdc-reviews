// This component is responsible for displaying the star-rating
// for 6 metrics by which a host is graded.
import React from 'react';
import Styles from '../styles/ReviewBreakdown.css'

const ReviewBreakdown = props => {
  const { accuracy, communication, cleanliness, location, checkin, value } = props.ratings;
  const renderStars = avgRating => {
    const wholeStar = <div className="breakdown star"><i className="fas fa-star"></i></div>;
    const halfStar = <div className="breakdown star half"><i className="fas fa-star-half-alt"></i></div>;
    const emptyStar = <div className="breakdown star empty"><i className="far fa-star"></i></div>;
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
  };

  return (
    <div>
      <table id="starTable">
        <tbody>
          <tr>
            <td className="categories">Accuracy</td>
            <td className="stars">{renderStars(accuracy)}</td>
            <td className="categories" id="thirdcolumn">Location</td>
            <td className="stars">{renderStars(location)}</td>
          </tr>
          <tr>
            <td className="categories">Communication</td>
            <td className="stars">{renderStars(communication)}</td>
            <td className="categories" id="thirdcolumn">Check In</td>
            <td className="stars">{renderStars(checkin)}</td>
          </tr>
          <tr>
            <td className="categories">Cleanliness</td>
            <td className="stars">{renderStars(cleanliness)}</td>
            <td className="categories" id="thirdcolumn">Value</td>
            <td className="stars">{renderStars(value)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReviewBreakdown;
