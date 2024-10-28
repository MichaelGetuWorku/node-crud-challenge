module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); // same us next(err)
};
