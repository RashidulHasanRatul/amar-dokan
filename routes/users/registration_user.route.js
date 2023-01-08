const express = require("express");
const router = express.Router();
const userRegistration = require("../../controllers/users/registration_user.controller");
router.post("/registration", userRegistration);

module.exports = router;
