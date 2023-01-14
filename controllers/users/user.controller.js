const User = require("../../schema/users/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function generateJWT(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
}

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

const userLogIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("No Registered User by this Email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const { _id } = user;
    const token = generateJWT({ email });
    res.send({
      token: token,
      message: "Login successful",
    });
  } else {
    return res.status(400).send("Unable to login");
  }
};

module.exports = { userRegistration, getAllUser, userLogIn };
