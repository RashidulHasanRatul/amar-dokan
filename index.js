const { app } = require("./app");
const PORT = 3000;

app.listen(PORT, (err) => {
  console.log("Server is running at PORT", PORT);
});