const { Pool } = require('pg');
const local = require('./utilities/config_local.js');
const ec2 = require('./utilities/config_ec2.js');

const pool = new Pool(local);

pool.connect(err => {
  if (err) throw err;
  console.log('connected to DB.');
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
};