const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('../db/pool.js');
const redis = require('redis');

const app = express();
const port = 3124;

const client = redis.createClient();

client.on('connect', () => console.log('Connected to Redis.'));
client.on('error', err => console.log('Failed to connect to Redis.'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:roomid', express.static('./public/dist'));

app.get('/api/reviews/rooms/:roomid/', (req, res) => { 
  const { roomid } = req.params;
  const { page } = req.query;
  const { search } = req.query;
  const { sortby } = req.query || 'relevant';

  client.get(`/reviews/${roomid}`, (err, result) => {
    if (err || result === null) {
      return pg
      .getReviews(roomid)
      .then(reviews => 
        sortby === 'relevant' || sortby === undefined
          ? pg.sortByRelevant(reviews)
          : pg.sortByRecent(reviews)
      )
      .then(sortedReviews => pg.getBySearchTerm(sortedReviews, search))
      .then(sortedReviews => pg.getPage(page, sortedReviews))
      .then(pageOfReviews => {
        client.set(`/reviews/${roomid}`, JSON.stringify(pageOfReviews), 'EX', 120);
        res.send(pageOfReviews);
      })
      .catch(err => { if (err) throw err; });
    }
    res.send(JSON.parse(result));
  });

});

app.get('/api/ratings/rooms/:roomid', (req, res) => {
  const { roomid } = req.params;
  client.get(`/ratings/${roomid}`, (err, result) => {
    if (err || result === null) {
      return pg
        .getReviews(roomid)
        .then(reviews => {
          const averageRatings = pg.calculateAverageRating(reviews);
          client.set(`/ratings/${roomid}`, JSON.stringify(averageRatings), 'EX', 120);
          res.send(averageRatings);
        })
        .catch(err => { if (err) throw err; });
    }
    res.send(JSON.parse(result));
  });
});

app.put('/api/reviews/rooms/:roomId'), (req, res) => {
  const { roomid } = req.params;
  pg
    .updateReview(roomid)
    .then(() => res.statusCode(200).end())
    .catch(err => res.statusCode(500));
};

app.post('/api/reviews/rooms/:roomId'), (req, res) => {
  const { roomid } = req.params;
  pg
    .createReview(roomid)
    .then(() => {
      client.get(`/reviews/${roomid}`, (err, result) => {
        if (result) { 
          pg.
            getReviews(roomid)
            .then(reviews => client.set(`/reviews/${roomid}`, JSON.stringify(reviews), 'EX', 120));
        }
      });
      res.statusCode(200).end();
    })
    .catch(err => res.statusCode(500));
};

app.delete('/api/reviews/rooms/:roomId'), (req, res) => {
  const { roomid } = req.params;
  pg
    .deleteReview(roomid)
    .then(() => res.statusCode(200).end())
    .catch(err => res.statusCode(500));
};

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
