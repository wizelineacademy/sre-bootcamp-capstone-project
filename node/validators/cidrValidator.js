const cidrService = require('../services/cidrService');

module.exports = (req, res, next) => {
  const cidr = req.params.cidr ? req.params.cidr : false;
  if (!cidr) {
    return res.send(422, { cidr: 'cidr is required' });
  }
  if (!cidrService.isAValidCidr(cidr)) {
    return res.send(422, {
      cidr: 'cidr must be a numeric value between 1 and 32'
    });
  }
  req.params.cidr = +req.params.cidr;
  return next();
}
