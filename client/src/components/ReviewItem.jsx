// This component is responsible for displaying each individual review including the body,
// the user's name, the user's photo, the date they stayed, and the "flag" option.
import React from 'react';

const ReviewItem = props => {
  const { review } = props;
  return (
    <div>
      <img src={review.userAvatar} alt="user avatar" />
      <span>{review.name}</span>
      <span>{review.dateStayed}</span>
      <div>
        <p>{review.review[0].body}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
