const Sequelize = require('sequelize')
const database = require('./database')

const User = database.define('user', {

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        // validate: {
        //     notEmpty: true,
        //     len: [5, 12]
        // }
    },

    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        // validate: {
        //     notEmpty: true,
        //     len: [8, 20]
        // }
    }

}, { database, createdAt: false, updatedAt: false })

module.exports = User