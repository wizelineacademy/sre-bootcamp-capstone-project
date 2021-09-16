module.exports = (req, res, next) => {
  const value = req.query.value ? req.query.value : false;
  if (!value) {
    return res.send(422, { value: 'value is required' })
  }
  next()
}
