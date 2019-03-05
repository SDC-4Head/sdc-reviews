# this.Reserve

> A full-stack app for making reservations with optimized back-end 

## Related Projects

  - https://github.com/SDC-4Head/sdc-image-gallery2
  - https://github.com/SDC-4Head/sdc-recommends
  - https://github.com/SDC-4Head/hrsf107-fec-booking

## Table of Contents

1. [Requirements](#requirements)
1. [Usage](#Usage)

## API Routing

|            ROUTE           |   METHOD    |
|----------------------------|-------------|
| /api/reviews/rooms/:roomId |     GET     |
| /api/reviews/rooms/:roomId |     PUT     |
| /api/reviews/rooms/:roomId |     POST    |
| /api/reviews/rooms/:roomId |    DELETE   |

## Requirements

- Node 11.6.0
- About 5GB available storage

## Usage

1. Clone to repo to your desktop.
1. Go to your terminal and navigate to root directory of repo, then execute ```npm install``` to install dependencies.
1. Configure the `pool` variable in the `pool.js` file of the `db` folder to the settings for your PostgreSQL on your computer.
1. Start up PostgreSQL server on your computer.
1. In your terminal at the root diretory, execute ```npm run generate-pg```. This will generate 3 files of data: `review.csv`, `user.csv`, and `room.csv`.
1. Once completed, execute ```npm run populate-pg```. This will populate your PostgreSQL database with the generated data.
1. Start up your Redis server on your computer.
1. Open two tabs in your terminal. At the root directory, execute ```npm start``` in one terminal and ```npm run build``` in the other terminal.
1. Visit `http://localhost:3124` in your browser to see the reviews.
