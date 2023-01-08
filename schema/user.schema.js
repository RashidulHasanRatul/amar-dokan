const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password Cannot contain password");
      }
    },
  },

  businessType: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
