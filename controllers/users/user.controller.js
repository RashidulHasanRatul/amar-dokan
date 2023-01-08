const User = require("../../schema/user.schema");
const bcrypt = require("bcrypt");

// User Registration
const userRegistration = async (req, res) => {
  const { email, name, businessType, phoneNumber, password } = req.body;
  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res
        .status(400)
        .send({ error: "User Already Exist ! Please try with new one" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      businessType: businessType,
      phoneNumber: phoneNumber,
    });
    await user.save();
    res.status(201).send("Sign up successful");
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get the All User List

const getAllUser = (req, res) => {
  try {
    // Find all users in the database
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(users);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { userRegistration, getAllUser };
