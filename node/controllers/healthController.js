exports.getHealth = (req, res, next) => {
  res.send('OK');
  next();
};
