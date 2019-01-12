DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;

\c reviewsdb;

\timing

CREATE TABLE IF NOT EXISTS users (
  userid SERIAL PRIMARY KEY,
  name VARCHAR(30),
  userAvatar VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS rooms (
  roomid SERIAL PRIMARY KEY,
  roomname VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS reviews (
  reviewid SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(userid),
  roomid INTEGER REFERENCES rooms(roomid),
  relevance INTEGER,
  body VARCHAR(30),
  date VARCHAR(20),
  accuracy INTEGER,
  checkin INTEGER,
  cleanliness INTEGER,
  communication INTEGER,
  location INTEGER,
  value INTEGER
);

COPY users (name, userAvatar)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/user.csv' 
DELIMITER ',' CSV;

COPY rooms (roomname)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/room.csv' 
DELIMITER ',' CSV;

COPY reviews (userid, roomid, relevance, body, date, accuracy, checkin, cleanliness, communication, location, value)
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/review.csv' 
DELIMITER ',' CSV;