const faker = require('faker');
const fs = require('fs');

const avatars = [
  'https://a0.muscache.com/im/users/3272332/profile_pic/1366680802/original.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/user/c76d5746-59f9-4af2-b8cb-55fd1bc4c45b.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/user/ce56e7ea-8e11-4307-bd19-047d8d72a707.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/users/45316353/profile_pic/1443546259/original.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/user/e79bbc7c-4592-4d1a-b0bb-59c33af9b180.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/e4140d32-72a1-4bfc-b869-86835c5a1b20.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/a37aad6f-e90d-49c5-abc3-6e58efdf71d6.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/user/f3fbd6b4-f3d8-4ec5-9e15-b99d635a1aa0.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/user/7e8ca207-efc4-40d7-b1c2-278ff1ffc9f6.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/user/bba8cf25-d4a7-4b5a-bf43-04a65c22afdb.jpg?aki_policy=profile_x_medium',
  'https://a0.muscache.com/im/pictures/ac8665ce-e787-4766-b456-eae390613d99.jpg?aki_policy=profile_x_medium'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const years = [
  '2018', 
  '2017', 
  '2016', 
  '2015', 
  '2014', 
  '2013', 
  '2012', 
  '2011', 
  '2010'
];

const generateRandomNumber = (min, max) => {
  let randomNumber = Math.round(Math.random() * max);
  if (randomNumber < min) {
    randomNumber = Math.round(Math.random() * max);
  }
  return randomNumber;
};

const userStream = fs.createWriteStream('user.csv', {flags: 'w'}); 
const reviewStream = fs.createWriteStream('review.csv', {flags: 'w'});
const roomStream = fs.createWriteStream('room.csv', {flags: 'w'});

let count = 1e7 + 1;

const write = () => {
  while (count > 0) {
    const review = `${generateRandomNumber(1, 2e6 + 1)},${generateRandomNumber(1, 1e7)},${generateRandomNumber(0, 10)},Hello WORLD,${months[generateRandomNumber(0, 11)]} ${years[generateRandomNumber(0, 8)]},${generateRandomNumber(1, 5)},${generateRandomNumber(1, 5)},${generateRandomNumber(1, 5)},${generateRandomNumber(1, 5)},${generateRandomNumber(1, 5)},${generateRandomNumber(1, 5)}\n`;
    if (!reviewStream.write(review)) { return; }
    if (count < 2e6 + 1) {
      const user = `${faker.name.firstName()},${avatars[generateRandomNumber(0, 10)]}\n`
      if (!userStream.write(user)) { return; }
    }
    if (count < 1e7 + 1) {
      const room = `room${count}\n`
      if (!roomStream.write(room)) { return; }
    }
    count--;
  }
  userStream.end();
  reviewStream.end();
  roomStream.end();
  const then = Date.now();
  const min = (then - now) * 1.666e-5;
  const roundMin = Math.trunc(min);
  const sec = Math.trunc((min - Math.trunc(min)) * 60);
  console.log(`Time to run ${roundMin} minutes ${sec} seconds`);
};

userStream.on('drain', () => write());
reviewStream.on('drain', () => write());
roomStream.on('drain', () => write());
const now = Date.now();
write();