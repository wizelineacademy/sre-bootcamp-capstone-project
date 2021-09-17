exports.getCidr = (req, res, next) => {
  const mask = req.params.mask;
  const response = {
    function: 'cidrToMask',
    input: mask,
    output: mask
  };
  return res.send(response);
};
