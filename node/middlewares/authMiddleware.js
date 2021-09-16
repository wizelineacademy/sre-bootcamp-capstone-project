const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const authorization = getAuthorizationHeader(req);
  const isAuthorized = (
    authorization &&
    isBearerTokenPresent(authorization) &&
    authService.verifyToken(authorization[1])
  );
  if (!isAuthorized) {
    return unauthorized(res);
  }
  next();
}

const getAuthorizationHeader = (req) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return false;
  }
  return authorization.split(' ');
}

const isBearerTokenPresent = (authorization) => {
  return authorization.length === 2 && authorization[0] === 'Bearer';
}

const unauthorized = (res) => {
  return res.status(401).send({ message: 'UNAUTHORIZED' });
}
