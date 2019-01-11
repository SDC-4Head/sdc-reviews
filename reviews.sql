DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;

\c reviewsdb;

CREATE TABLE IF NOT EXISTS users (
  firstname VARCHAR(30),
  profilepic VARCHAR(120),
  userid SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS rooms (
  roomid SERIAL PRIMARY KEY,
  accuracy INTEGER,
  checkin INTEGER,
  cleanliness INTEGER,
  communication INTEGER,
  location INTEGER,
  overall INTEGER,
  quality INTEGER,
  value INTEGER
);

CREATE TABLE IF NOT EXISTS reviews (
  reviewid SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(userid),
  roomid INTEGER REFERENCES rooms(roomid),
  relevance INTEGER,
  body VARCHAR(30),
  date VARCHAR(20)
);

COPY users (firstname, profilepic)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/user.csv' 
DELIMITER ',' CSV;

COPY reviews (userid, roomid, relevance, body, date)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/review.csv' 
DELIMITER ',' CSV;

COPY rooms (accuracy, checkin, cleanliness, communication, location, overall, quality, value)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/room.csv' 
DELIMITER ',' CSV;