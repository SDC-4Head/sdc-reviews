const { Client } = require('pg');

const pool = new Pool({
  user: 'francisdistor',
  host: 'localhost',
  database: 'reviewsdb',
  password: 'root',
  port: 9000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getReviews = () => {
  pool.connect((err, client, release) => {
    if (err) { throw err; }
    const query = 'SELECT * FROM ';
    client.query(query, value, (err, result) => {
      release();
      if (err) { throw err; }
      console.log(result.rows);
    });
  });
};

module.exports = {
  getReviews,
};