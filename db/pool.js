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
        const query = 
          `SELECT relevance, body, date, accuracy, checkin, cleanliness, communication, location, value, name, useravatar FROM reviews
          LEFT JOIN users on reviews.userid = users.userid
          WHERE roomid = ${roomid};`;
        client.query(query, (err, result) => {
          release();
          if (err) { reject(err); }
          resolve(result.rows);
        });
      });
    });
  },

  createReview: roomid => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) { reject(err); }
        const query = 
          `INSERT INTO reviews (userid, roomid, relevance, body, date, accuracy, checkin, cleanliness, communication, location, value)
          VALUES (1, ${roomid}, 8, 'Lorem ipsum cadabra', 'January 2019', 4, 5, 2, 5, 3, 2);`;
        client.query(query, (err, result) => {
          release();
          if (err) { reject(err); }
          resolve();
        })
      });
    });
  },

  updateReview: roomid => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) { reject(err); }
        const query = 
          `UPDATE reviews 
          SET body='newbody'
          WHERE roomid = ${roomid};`;
        client.query(query, (err, result) => {
          release();
          if (err) { reject(err); }
          resolve();
        })
      });
    });
  },

  deleteReview: roomid => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) { reject(err); }
        const query = 
        `DELETE FROM reviews WHERE roomid = ${roomid};`;
        client.query(query, (err, result) => {
          release();
          if (err) { reject(err); }
          resolve();
        })
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