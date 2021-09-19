const Sequelize = require('sequelize');
const { DATABASE } = require('../config/config');

const sequelize = new Sequelize(
  DATABASE.name,
  DATABASE.user,
  DATABASE.password,
  {
    dialect: DATABASE.dialect,
    host: DATABASE.host,
    port: DATABASE.port
  }
);

module.exports = sequelize;
