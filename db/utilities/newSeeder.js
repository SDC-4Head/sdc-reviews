const faker = require('faker');
const fs = require('fs');

const domain = 'localhost';

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

let reviewHeaders = ['roomId', 'relevance', 'name', 'userAvatar', 'dateStayed'];
let numberHeaders = ['accuracy', 'communication', 'cleanliness', 'location', 'checkin', 'value', 'body'];
let reviewResult = [];
let numberResult = [];

reviewResult.push(reviewHeaders);
numberResult.push(numberHeaders);


for (let i = 1; i < 100; i++) {
  reviewResult.push([
    i,
    generateRandomNumber(1, 10),
    faker.name.firstName(),
    avatars[generateRandomNumber(0, 10)],
    `${months[generateRandomNumber(0, 11)]} ${years[generateRandomNumber(0, 8)]}`
  ]);
  numberResult.push([
    generateRandomNumber(1, 5),
    generateRandomNumber(1, 5),
    generateRandomNumber(1, 5),
    generateRandomNumber(1, 5),
    generateRandomNumber(1, 5),
    generateRandomNumber(1, 5),
    faker.lorem.paragraph(4)
  ]);
}

console.log(numberResult);