const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Import the config.json file
const env = process.env.NODE_ENV || 'development'; // Check the environment (development by default)
const dbConfig = config[env]; // Get the environment-specific configuration

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Export the Sequelize instance for use in models
module.exports = sequelize;
