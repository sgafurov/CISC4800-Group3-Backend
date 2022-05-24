const pkg = require('../../package.json')
require('dotenv').config()

const Sequelize = require('sequelize');
const db_url = process.env.DATABASE_URL
const db_host = process.env.HOST

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

const db = new Sequelize(db_url, {
  host: db_host,
  port: 5432,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false //false or true?
    },
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});

//LOCAL POSTGRESS DB
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