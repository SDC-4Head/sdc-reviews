// This component is responsible for displaying the star-rating
// for 6 metrics by which a host is graded.
import React from 'react';
import Styles from '../styles/ReviewBreakdown.css'

const ReviewBreakdown = () => (
  <div>
    <table>
      <tbody>
        <tr>
          <td className="categories">Accuracy</td>
          <td className="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</td>
          <td className="categories" id="thirdcolumn">Location</td>
          <td className="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</td>
        </tr>
        <tr>
          <td className="categories">Communication</td>
          <td className="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</td>
          <td className="categories" id="thirdcolumn">Check In</td>
          <td className="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</td>
        </tr>
        <tr>
          <td className="categories">Cleanliness</td>
          <td className="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</td>
          <td className="categories" id="thirdcolumn">Value</td>
          <td className="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ReviewBreakdown;
