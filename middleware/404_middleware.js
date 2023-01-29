const pageNotFound = function (req, res, next) {
  res.status(404);
  res.render("errors/404", { title: "Page Not Found" });
  res.end();
  next();
};

module.exports = pageNotFound;
