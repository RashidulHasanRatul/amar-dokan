const express = require("express");
const router = express.Router();
const check_login = require("../../middleware/check_login.middleware");
const {
  customerRegistration,
  getAllCustomers,
} = require("../../controllers/customers/customers.controller");

// customer Registration : POST
router.post("/customers", check_login, customerRegistration);
// Customer Get All :GET
router.get("/customers", check_login, getAllCustomers);
module.exports = router;
