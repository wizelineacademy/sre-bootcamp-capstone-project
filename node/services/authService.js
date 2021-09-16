const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT } = require('../config/config');
const User = require('../models/user');

exports.login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return false;
  }
  return verifyPassword(user, password);
}

exports.verifyToken = (authorization) => {
  try {
    const user = jwt.verify(authorization, JWT.secret);
    if (user) {
      return true;
    }
    return false;
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
  const tokenJWT = jwt.sign(data, JWT.secret, options);
  return tokenJWT;
}
