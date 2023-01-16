const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  productType: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
