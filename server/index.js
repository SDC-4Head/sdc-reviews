const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('../db/pool.js');
const path = require('path');
// const redis = require('redis');
// const morgan = require('morgan');

const app = express();
const port = 3124;

// const client = redis.createClient();

// client.on('connect', () => console.log('Connected to Redis.'));
// client.on('error', err => console.log('Failed to connect to Redis.'));
// client.flushall((err, success) => {
//   if (err) { return console.log('Could not flush.'); }
//   console.log('Success in flush!');
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:roomid', express.static('./public/dist'));
// app.use(morgan());

app.get('/api/reviews/rooms/:roomid/', (req, res) => { 
  const { roomid } = req.params;
  const { page } = req.query;
  const { search } = req.query;
  const { sortby } = req.query || 'relevant';

  // client.get(`reviews/${roomid}`, (err, result) => {
  //   if (err || result === null) {
      // return 
      pg
      .getReviews(roomid)
      .then(reviews => {
        // client.set(`reviews/${roomid}`, JSON.stringify(reviews), 'EX', 600);
        res.send(reviews);
        }
      )
      .catch(err => { if (err) throw err; });
    }
    // res.send(JSON.parse(result));
  // });

// }
);

app.get('/api/ratings/rooms/:roomid', (req, res) => {
  const { roomid } = req.params;
  // client.get(`ratings/${roomid}`, (err, result) => {
    // if (err || result === null) {
      // return 
      pg
        .getReviews(roomid)
        .then(reviews => {
          // client.set(`ratings/${roomid}`, JSON.stringify(reviews), 'EX', 600);
          res.send(reviews);
        })
        .catch(err => { if (err) throw err; });
    }
    // res.send(JSON.parse(result));
  // });
// }
);

app.get('/loaderio-cede38c6d273ec58a64293c11798e730', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist', 'loaderio-cede38c6d273ec58a64293c11798e730.txt'))
})

app.put('/api/reviews/rooms/:roomid', (req, res) => {
  const { roomid } = req.params;
  pg
    .updateReview(roomid)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).end());
});

app.post('/api/reviews/rooms/:roomid/', (req, res) => {
  const { roomid } = req.params;
  pg
    .createReview(roomid)
    .then(() => {
      client.get(`/reviews/${roomid}`, (err, result) => {
        if (result) { 
          pg.
            getReviews(roomid)
            .then(reviews => client.set(`/reviews/${roomid}`, JSON.stringify(reviews), 'EX', 600));
        }
      });
      res.statusCode(200).end();
    })
    .catch(err => res.statusCode(500));
});

app.delete('/api/reviews/rooms/:roomid', (req, res) => {
  const { roomid } = req.params;
  pg
    .deleteReview(roomid)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).end());
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
