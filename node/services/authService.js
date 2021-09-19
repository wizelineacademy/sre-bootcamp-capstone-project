const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT } = require('../config/config');
const User = require('../models/user');

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return false;
  }
  if (!verifyPassword(user, password)) {
    return false
  }
  return generateToken(user);
}

const verifyToken = (authorization) => {
  try {
    return jwt.verify(authorization, JWT.secret);
  } catch (err) {
    return false;
  }
}

const verifyPassword = (user, password) => {
  const hashedPassword = crypto
    .createHash('sha512')
    .update(password + user.salt)
    .digest('hex');
  return (hashedPassword === user.password);
}

const generateToken = user => {
  const data = { role: user.role };
  const options = { noTimestamp: true };
  return jwt.sign(data, JWT.secret, options);
}

module.exports.login = login;
module.exports.verifyToken = verifyToken;
