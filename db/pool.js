const { Pool } = require('pg');

const pool = new Pool({
  user: 'francisdistor',
  host: 'localhost',
  database: 'reviewsdb',
  password: 'root',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  getReviews: (roomid) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) { reject(err); }
        const query = `SELECT * FROM rooms WHERE roomid = ${roomid}`;
        client.query(query, (err, result) => {
          release();
          if (err) { reject(err); }
          console.log(result.rows);
          resolve(result.rows);
        });
      });
    });
  },

  sortByRelevant: allReviews =>
    new Promise(resolve => {
      const byRelevance = (a, b) => b.relevance - a.relevance;
      resolve(allReviews.sort(byRelevance));
    }),

  sortByRecent: allReviews =>
    new Promise(resolve => {
      const byDate = (a, b) => new Date(b.dateStayed) - new Date(a.dateStayed);
      resolve(allReviews.sort(byDate));
    }),

  getPage: (page = 1, allReviews) =>
    new Promise(resolve => {
      const firstReview = page === 1 ? 0 : (page - 1) * 7;
      const lastReview = firstReview + 7;

      resolve(
        lastReview < allReviews.length
          ? allReviews.slice(firstReview, lastReview)
          : allReviews.slice(firstReview)
      );
    }),

  getBySearchTerm: (allReviews, query = null) =>
    new Promise(resolve => {
      query === null
        ? resolve(allReviews)
        : resolve(allReviews.filter(review => review.review[0].body.includes(query)));
    }),

  calculateAverageRating: allReviews => {
    // eslint-disable-next-line no-new
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

    // eslint-disable-next-line guard-for-in
    allReviews.forEach(review => {
      ratings.accuracy = (ratings.accuracy + review.review[0].accuracy) / 2;
      ratings.communication = (ratings.communication + review.review[0].communication) / 2;
      ratings.cleanliness = (ratings.cleanliness + review.review[0].cleanliness) / 2;
      ratings.location = (ratings.location + review.review[0].location) / 2;
      ratings.checkin = (ratings.checkin + review.review[0].checkin) / 2;
      ratings.value = (ratings.value + review.review[0].value) / 2;
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

};