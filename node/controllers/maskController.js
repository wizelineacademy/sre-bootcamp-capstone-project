const maskService = require('../services/maskService');

exports.getMask = (req, res, next) => {
  const cidr = req.params.cidr;
  const output = maskService.cidrToMask(cidr)
  const response = {
    function: 'cidrToMask',
    input: cidr,
    output
  };
  return res.send(response);
};
