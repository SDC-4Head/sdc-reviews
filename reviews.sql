DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;

\c reviewsdb;

CREATE TABLE IF NOT EXISTS users (
  firstname VARCHAR(30),
  profilepic VARCHAR(120),
  userid SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS reviews (
  reviewid SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(userid),
  relevance INTEGER,
  body VARCHAR(110),
  date VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS rooms (
  roomid SERIAL PRIMARY KEY,
  reviewid INTEGER REFERENCES reviews(reviewid),
  accuracy INTEGER,
  chekin INTEGER,
  cleanliness INTEGER,
  communication INTEGER,
  location INTEGER,
  overall INTEGER,
  quality INTEGER,
  value INTEGER
);

COPY users (firstname, profilepic)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/user.csv' 
DELIMITER ',' CSV;

