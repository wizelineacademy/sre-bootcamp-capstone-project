const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT } = require('../config/config');
const User = require('../models/user');

exports.login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  return user ? verifyPassword(user, password) : false;
}

exports.verifyToken = (authorization) => {
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
  if (hashedPassword !== user.password) {
    return false;
  }
  const data = { role: user.role };
  const options = { noTimestamp: true };
  return jwt.sign(data, JWT.secret, options);
}
