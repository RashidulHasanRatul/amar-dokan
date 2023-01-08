const { app } = require("./app");
const PORT = 3000;
require("./db/mongoose");
app.listen(PORT, (err) => {
  console.log("Server is running at PORT", PORT);
});
