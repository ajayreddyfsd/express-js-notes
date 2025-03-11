const express = require("express");
const app = express();

//route1
app.get("/", (req, res) => {
  res.send("helllllllooooooooooooooo");
});

//route2
app.get("/messages", (req, res) => {
  res.send("message corruped");
});

app.listen(3000, () => {
  console.log("listening on PORT 3000");
});
