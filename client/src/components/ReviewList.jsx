/* eslint-disable import/extensions */
// This component is responsible for the search bar, filtering drop-down menu,
// each review, and finally, the pagination controls.
import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = () => (
  <div>
    <form>
      <input type="text" placeholder="Search Reviews" />
    </form>
    <select>
      <option>Most Relevant</option>
      <option>Most Recent</option>
    </select>
    <ReviewItem />
    <ReviewItem />
    <ReviewItem />
    <ReviewItem />
    <ReviewItem />
    <ReviewItem />
    <ReviewItem />
  </div>
);

export default ReviewList;
