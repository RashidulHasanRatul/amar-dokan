const express = require("express");
const router = express.Router();
const check_login = require("../../middleware/check_login.middleware");
const {
  userRegistration,
  getAllUser,
  userLogIn,
} = require("../../controllers/users/user.controller");

router.post("/registration", userRegistration);
router.get("/users", check_login, getAllUser);
router.post("/login", userLogIn);
module.exports = router;
