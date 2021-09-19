const cidrService = require('../services/cidrService');

exports.getCidr = (req, res) => {
  const mask = req.params.mask;
  const response = {
    function: 'maskToCidr',
    input: mask,
    output: cidrService.maskToCidr(mask)
  };
  return res.send(response);
};
