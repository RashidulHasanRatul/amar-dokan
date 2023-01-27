const express = require("express");
const router = express.Router();
const check_login = require("../../middleware/check_login.middleware");
const {
  userRegistration,
  getAllUser,
  userLogIn,
  userProfile,
  deleteUser,
  updateUserProfile,
  verifyEmail
} = require("../../controllers/users/user.controller");

router.post("/registration", userRegistration);
router.get("/users", check_login, getAllUser);
router.get("/verify-email", verifyEmail);
router.post("/login", userLogIn);
router.get("/profile", check_login, userProfile);
router.put("/profile/update-profile", check_login, updateUserProfile);
router.delete("/profile", check_login, deleteUser);

module.exports = router;
