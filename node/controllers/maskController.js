exports.getCidrToMask = (req, res, next) => {
  const value = req.query.value;
  const response = {
    function: 'cidrToMask',
    input: value,
    output: value
  };
  return res.send(response);
};

exports.getMaskToCidr = (req, res, next) => {
  const value = req.query.value;
  const response = {
    function: 'maskToCidr',
    input: value,
    output: value
  };
  return res.send(response);
};
