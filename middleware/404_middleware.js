const pageNotFound = function (req, res, next) {
  res.send({message:"404 Not Found"});
  res.end();
  next();
};

module.exports = pageNotFound;
