// This component is responsible for displaying each individual review including the body,
// the user's name, the user's photo, the date they stayed, and the "flag" option.
import React from 'react';
import Styles from '../styles/ReviewItem.css';

const ReviewItem = props => {
  const { review } = props;
  return (
    <div className="reviewContainer">
      <div id="flag">&#9872;</div>
      <div className="userInfo">
        <img src={review.userAvatar} alt="user avatar" className="avatar" />
        <div className="userText">
          <span id="username">{review.name}</span>
          <span id="dateStayed">{review.dateStayed}</span>
        </div>
      </div>
      <div>
        <p>{review.review[0].body}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
