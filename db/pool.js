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
  getRatingsOrReviews: (roomid, string) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) { reject(err); }
        const query = string === 'ratings' 
          ? `SELECT * FROM rooms WHERE roomid = ${roomid}` 
          : `SELECT * FROM reviews WHERE roomid`;
        client.query(query, (err, result) => {
          release();
          if (err) { reject(err); }
          resolve(result.rows[0]);
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
};