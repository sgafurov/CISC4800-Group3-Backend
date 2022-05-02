const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const db = new Sequelize('dfoscvt84ej6bd', 'uagubggfdxjxxn', '5d9aa7c7f6ce0216f5ffc12f8bc1e46a9bb0580587a9160aee64e0c12c8fc6ab', {
    host: 'ec2-52-5-110-35.compute-1.amazonaws.com',
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
    }
  })

  db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db