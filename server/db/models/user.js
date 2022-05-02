const Sequelize = require('sequelize')
const database = require('../database')

const User = database.define('user', {

    username: {
        type: Sequelize.STRING,
        allowNull : false,
        primaryKey : true,
        validate: {
            notEmpty: true
        }
        // validate: {
        //     notEmpty: true,
        //     len: [5, 12]
        // }
    },

    password: {
        type: Sequelize.TEXT,
        allowNull : false,
        validate: {
            notEmpty: true
        }
        // validate: {
        //     notEmpty: true,
        //     len: [8, 20]
        // }
    },

})

module.exports = User