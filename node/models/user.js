const Sequelize = require('sequelize')

const sequelize = require('../database/db')

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  role: Sequelize.STRING,
}, {
  timestamps: false
});

User.removeAttribute('id');

module.exports = User;
