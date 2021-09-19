const maskService = require('../services/maskService');

module.exports = (req, res, next) => {
  const mask = req.params.mask ? req.params.mask : false;
  if (!mask) {
    return res.send(422, { mask: 'mask is required' });
  }
  if (!maskService.isValidMask(mask)) {
    return res.send(422, { mask: 'provided value is not a valid subnet mask' });
  }
  return next();
}
