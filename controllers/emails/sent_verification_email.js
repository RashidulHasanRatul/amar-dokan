const nodemailer = require("nodemailer");
require("dotenv").config();
const sendVerificationEmail = (email, token) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.example.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.OWNERS_EMAIL,
      pass: process.env.OWNERS_EMAIL_PASS,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Amar Dokan" <welcome@example.com>', // sender address
    to: email, // list of receivers
    subject: "Amar Dokan Email Verification", // Subject line
    html: `Please click this link to verify your email: <a href="http://localhost:3000/verify-email/${token}">http://localhost:3000/verify-email/${token}</a>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Verification Email  sent: %s", info.messageId);
  });
};

module.exports = sendVerificationEmail;
