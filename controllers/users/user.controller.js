const User = require("../../schema/users/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const uuid = require("uuid");
const sendEmail = require("../emails/send_welcome_email");
const sendVerificationEmail = require("../emails/sent_verification_email");

function generateJWT(userID) {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "5h" });
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
      userId: uuid.v4(),
    });
    await user.save();
    const token = generateJWT(user.userId);
    sendVerificationEmail(user.email, token);
    res.status(201).send("Sign up successful");
  } catch (e) {
    res.status(400).send(e);
  }
};

// User Verification
const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findOne({ userId: decoded.userID });
    if (!user) throw new Error("User not found");
    user.isVerified = true;
    await user.save();
    res.send("emailVerified");
    sendEmail(user.email, user.name);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get the All User List

const getAllUser = (req, res) => {
  try {
    // Find all users in the database
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).send(err);
      }

      if (users == "") {
        res.send("There is no user in the DB");
      } else {
        res.send(users);
      }
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// User Login
const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("No Registered User by this Email");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { userId } = user;
      const token = generateJWT({ userId });
      res.send({
        token: token,
        message: "Login successful",
      });
    } else {
      return res.status(400).send("Unable to login");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// user profile
const userProfile = async (req, res) => {
  try {
    User.findOne({ userId: req.user.userId }, function (err, user) {
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (err) {
        return res.status(500).send(err);
      }

      const sortedUser = _.omit(user.toObject(), ["password", "userId", "_id"]);
      res.send(sortedUser);
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "businessType", "phoneNumber"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    cache.set(req.user.userId, req.user, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        res.send(req.user);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and delete it
    const result = await User.findByIdAndRemove(req.user._id);
    // If the user is not found, return a 404 status
    console.log(result);
    if (!result) {
      return res.status(404).send("User not found");
    }

    // Send a response indicating that the user was deleted
    res.send("User deleted Successfully");
  } catch (error) {
    // Handle any errors that occurred during the operation
    res.status(500).send(error.message);
  }
};

module.exports = {
  userRegistration,
  getAllUser,
  userLogIn,
  userProfile,
  updateUserProfile,
  deleteUser,
  verifyEmail,
};
