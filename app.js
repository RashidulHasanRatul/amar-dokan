const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const pageNotFound = require("./middleware/404_middleware");
const check_login = require("./middleware/check_login.middleware");
const homePage = require("./routes/home/homePage");
const user = require("./routes/users/user.route");
const customer = require("./routes/customers/customer.route");
dotenv.config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(homePage, user, customer);
app.use(pageNotFound);

module.exports = { app };
