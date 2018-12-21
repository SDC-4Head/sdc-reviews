// This component is responsible for displaying each individual review including the body,
// the user's name, the user's photo, the date they stayed, and the "flag" option.
import React from 'react';

const ReviewItem = () => (
  <div>
    <img src="http://lorempixel.com/150/150" alt="user avatar" />
    <span>Joleen</span>
    <span>October 2018</span>
    <div>
      <p>
        Perfect place in the perfect location! We are young parents who just needed time to
        ourselves. This was the perfect location! We were in North Park, where there delicious food,
        places to explore, close to walk around North Park, but also close uber/lyft rides or
        scooter rides to downtown Gaslamp, Little Italy, and much more! Love that its two stories in
        a great neighborhood! HIGHLY RECOMMEND!
      </p>
    </div>
  </div>
);

export default ReviewItem;
