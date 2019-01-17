const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('../db/pool.js');
const morgan = require('morgan');

const app = express();
const port = 3124;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:roomid', express.static('./public/dist'));
app.use(morgan());

app.get('/api/reviews/rooms/:roomid/', (req, res) => { 
  const { roomid } = req.params;
  const { page } = req.query;
  const { search } = req.query;
  const { sortby } = req.query || 'relevant';

  pg
    .getReviews(roomid)
    .then(reviews => 
      sortby === 'relevant' || sortby === undefined
        ? pg.sortByRelevant(reviews)
        : pg.sortByRecent(reviews)
    )
    .then(sortedReviews => pg.getBySearchTerm(sortedReviews, search))
    .then(sortedReviews => pg.getPage(page, sortedReviews))
    .then(pageOfReviews => res.send(pageOfReviews))
    .catch(err => { 
      res.status(500).end();
      if (err) throw err; 
    });
});

app.get('/api/ratings/rooms/:roomid', (req, res) => {
  const { roomid } = req.params;
  pg
    .getReviews(roomid)
    .then(reviews => res.send(pg.calculateAverageRating(reviews)))
    .catch(err => { if (err) throw err; });
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
    .then(() => res.statusCode(200).end())
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
