const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('schedulemanager', 'rian', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;