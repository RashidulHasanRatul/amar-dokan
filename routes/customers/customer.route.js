const express = require("express");
const router = express.Router();
const {
  customerRegistration,
  getAllCustomers,
} = require("../../controllers/customers/customers.controller");

router.post("/customers", customerRegistration);
router.get("/customers", getAllCustomers);
module.exports = router;
