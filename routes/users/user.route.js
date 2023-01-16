const express = require("express");
const router = express.Router();
const check_login = require("../../middleware/check_login.middleware");
const {
  userRegistration,
  getAllUser,
  userLogIn,
  userProfile,
} = require("../../controllers/users/user.controller");

router.post("/registration", userRegistration);
router.get("/users", check_login, getAllUser);
router.post("/login", userLogIn);
router.get("/profile", check_login, userProfile);
module.exports = router;
