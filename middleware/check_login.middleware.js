const User = require("../schema/users/user.schema");
const jwt = require("jsonwebtoken");
const check_login = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    next("Authentication Failed!!!!");
  }
};

module.exports = check_login;