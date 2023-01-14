const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  mobileNumber: {
    type: Number,
    required:true,
    min: 1000000000,
    max: 9999999999,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
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
