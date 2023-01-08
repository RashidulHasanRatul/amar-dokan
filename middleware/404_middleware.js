const pageNotFound = function (req, res, next) {
  res.write(__dirname + "/404.html");
  res.end();
  next();
};

module.exports = pageNotFound;
