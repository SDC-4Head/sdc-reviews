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

const getRatingsOrReviews = (roomid, string) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) { reject(err); }
      const query = string === 'ratings' 
        ? 'SELECT * FROM rooms WHERE roomid = $1' 
        : 'SELECT * FROM reviews WHERE roomid';
      client.query(query, [`${roomid}`], (err, result) => {
        release();
        if (err) { reject(err); }
        resolve(result.rows[0]);
      });
    });
  });
};

module.exports = {
  getRatingsOrReviews,
};