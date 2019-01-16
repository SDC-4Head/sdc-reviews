DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE reviews
  WITH REPLICATION = {
    'class' : 'SimpleStrategy', 
    'replication_factor' : 1
  };

USE reviews;

CREATE TYPE reviews.content (
  accuracy INT,
  communication INT,
  cleanliness INT,
  location INT,
  checkin INT,
  value INT,
  body TEXT
);

CREATE TABLE IF NOT EXISTS counter (
  currentid INT,
  PRIMARY KEY (currentid)
);

CREATE TABLE IF NOT EXISTS review (
  roomid INT,
  relevance SMALLINT,
  name TEXT,
  useravatar TEXT,
  date TEXT,
  review LIST<FROZEN <content>>,
  PRIMARY KEY (roomid)
);

COPY review (roomid, relevance, name, useravatar, date, review) 
FROM '/Users/francisdistor/Desktop/immersive/sdc/hrsf107-fec-reviews/cassandra.csv' 
WITH DELIMITER='|' 
AND HEADER=FALSE;