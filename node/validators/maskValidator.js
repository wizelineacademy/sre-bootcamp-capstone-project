module.exports = (req, res, next) => {
  const value = req.params.cidr ? req.params.cidr : false;
  if (!value) {
    return res.send(422, { cidr: 'cidr is required' })
  }
  next()
}
