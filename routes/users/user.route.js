const express = require("express");
const router = express.Router();
const {
  userRegistration,
  getAllUser,
} = require("../../controllers/users/user.controller");

router.post("/registration", userRegistration);
router.get("/users", getAllUser);
module.exports = router;
