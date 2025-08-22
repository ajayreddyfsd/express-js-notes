// 1. Import the Express library to create a web server
const express = require("express");

// 2. Create an instance of Express. 'app' is our server
const app = express();

// 3. ROUTE 1: When someone goes to the homepage "/", this function runs
// req = request from the user, res = response we send back
app.get("/", (req, res) => {
  res.send("helllllllooooooooooooooo"); // Sends this text to the user's browser
});

// 4. ROUTE 2: When someone goes to "/messages", this function runs
app.get("/messages", (req, res) => {
  res.send("message corruped"); // Sends this text to the user's browser
});

// 5. Start the server on port 3000 and show a message in the terminal
app.listen(3000, () => {
  console.log("listening on PORT 3000");
});
