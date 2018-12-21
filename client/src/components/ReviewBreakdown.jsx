// This component is responsible for displaying the star-rating
// for 6 metrics by which a host is graded.
import React from 'react';

const ReviewBreakdown = () => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>Accuracy</td>
          <td>&#9734;&#9734;&#9734;&#9734;&#9734;</td>
          <td>Location</td>
          <td>&#9734;&#9734;&#9734;&#9734;&#9734;</td>
        </tr>
        <tr>
          <td>Communication</td>
          <td>&#9734;&#9734;&#9734;&#9734;&#9734;</td>
          <td>Check In</td>
          <td>&#9734;&#9734;&#9734;&#9734;&#9734;</td>
        </tr>
        <tr>
          <td>Cleanliness</td>
          <td>&#9734;&#9734;&#9734;&#9734;&#9734;</td>
          <td>Value</td>
          <td>&#9734;&#9734;&#9734;&#9734;&#9734;</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ReviewBreakdown;
