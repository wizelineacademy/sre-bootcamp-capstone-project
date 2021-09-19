const authService = require('../services/authService');

const postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const data = await authService.login(username, password);
  let response = { data };
  res.send(response);
  next();
}

module.exports.postLogin = postLogin
