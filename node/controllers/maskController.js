const maskService = require('../services/maskService');

exports.getMask = (req, res) => {
  const cidr = req.params.cidr;
  const response = {
    function: 'cidrToMask',
    input: cidr,
    output: maskService.cidrToMask(cidr)
  };
  return res.send(response);
};
