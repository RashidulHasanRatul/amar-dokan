const express = require("express");
const router = express.Router();
const customerRegistration = require("../../controllers/customers/customers.controller");

router.post("/customers", customerRegistration);

module.exports = router;
