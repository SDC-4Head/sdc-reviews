/* eslint-disable prefer-destructuring */
const faker = require('faker');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/errbnb');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  roomId: Number,
  name: String,
  userAvatar: String,
  dateStayed: String,
  review: [
    {
      accuracy: Number,
      communication: Number,
      cleanliness: Number,
      location: Number,
      checkin: Number,
      value: Number,
      body: String
    }
  ]
});

const Review = mongoose.model('Review', reviewSchema);

const generateRandomNumber = (min, max) => {
  let randomNumber = Math.round(Math.random() * max);
  if (randomNumber < min) {
    randomNumber = Math.round(Math.random() * max);
  }
  return randomNumber;
};

const generateReviewDocuments = qty =>
  new Promise((resolve, reject) => {
    for (let i = 0; i <= qty; i += 1) {
      const review = new Review({
        roomId: generateRandomNumber(0, 99),
        name: faker.name.firstName(),
        userAvatar: 'http://lorempixel.com/150/150/',
        dateStayed: faker.date.past(),
        review: [
          {
            accuracy: generateRandomNumber(1, 5),
            communication: generateRandomNumber(1, 5),
            cleanliness: generateRandomNumber(1, 5),
            location: generateRandomNumber(1, 5),
            checkin: generateRandomNumber(1, 5),
            value: generateRandomNumber(1, 5),
            body: faker.lorem.paragraphs(4)
          }
        ]
      });
      Review.create(review, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    }
  });

const clearDatabase = () =>
  new Promise((resolve, reject) => {
    Review.deleteMany({}, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

const seedDb = qty => {
  clearDatabase()
    .then(() => generateReviewDocuments(qty))
    .catch(err => {
      throw err;
    });
};

seedDb(10000);
