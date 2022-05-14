const pkg = require('../../package.json')

const Sequelize = require('sequelize');
require('dotenv').config();
const DBURL = "postgres://vikduugkssveon:2c9b6a913355e40012246ebd6d3e129d171c68f71891a5fdb68f4478efd6f4fd@ec2-3-218-171-44.compute-1.amazonaws.com:5432/d5b93skn88ug65";
const db_url = process.env.DATABASE_URL
console.log(process.env.DATABASE_URL)

/*
Host
ec2-54-80-123-146.compute-1.amazonaws.com
Database dav59l7b31i4iu
User njweyjexkafpcb
Port 5432
Password 00c6b9ac71dd4ab3f9e7fbab1f0b16444d1fcaebf466575d5c092453a9210422
URI postgres://njweyjexkafpcb:00c6b9ac71dd4ab3f9e7fbab1f0b16444d1fcaebf466575d5c092453a9210422@ec2-54-80-123-146.compute-1.amazonaws.com:5432/dav59l7b31i4iu
Heroku CLI heroku pg:psql postgresql-transparent-29164 --app postgresrmatest
*/

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});

// const db = new Sequelize('weather_app_db', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   protocol: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   logging: false
// })

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db