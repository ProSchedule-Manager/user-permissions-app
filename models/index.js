const sequelize = require('../config/database');
const User = require('./User');

const syncDatabase = async () => {
    await sequelize.sync(); 
    console.log('Database synced!');
};

module.exports = {
    User,
    syncDatabase
};