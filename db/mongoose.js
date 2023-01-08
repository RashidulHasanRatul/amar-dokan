const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/amar-dokan";

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});
