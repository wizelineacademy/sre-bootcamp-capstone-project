const routes = require('./routes');
const methods = require('../services/methods');

exports.init = (app) => {
  app.post('/login', routes.login);
  app.get('/_health', routes.health);
  app.get('/cidr-to-mask', routes.cidrToMask);
  app.get('/mask-to-cidr', routes.maskToCidr);
};

exports.health = (req, res, next) => {
  res.send('OK');
  next();
}

exports.login = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let response = {
    "data": await methods.loginFunction(username, password)
  };
  res.send(response);
  next();
}

exports.cidrToMask = (req, res, next) => {
  let value = req.query.value ? req.query.value : false;
  if (!value) {
    res.send(422, 'No value provided')
  } else {
    let response = {
      "function": "cidrToMask",
      "input": value,
      "output": methods.cidrToMaskFunction(value)
    };
    res.send(response);
    next();
  }
}

exports.maskToCidr = (req, res, next) => {
  let value = req.query.value ? req.query.value : false;
  if (!value) {
    res.send(422, 'No value provided')
  } else {
    let response = {
      "function": "maskToCidr",
      "input": value,
      "output": methods.maskToCidrFunction(value)
    };
    res.send(response);
    next();
  }
}
