const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = (email, name) => {
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
    subject: "Welcome to our app", // Subject line
    text: `Hello ${name}, welcome to our app!`, // plain text body
    html: `<b>Hello ${name}, welcome to our app!</b>`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendEmail;
