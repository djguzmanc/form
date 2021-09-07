module.exports = function (req, res, next) {
  const chance = Math.random() * 50;
  if (chance < 25) {
    res.status(500).send({
      status: 'error',
      message: 'Invalid Subscription request.'
    });
    return;
  }
  next()
}