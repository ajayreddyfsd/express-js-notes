// 1. Imports the Express library. Express helps us make a web server easily.
const express = require("express");

// 2. Create an instance of Express. 'app' is our server.
const app = express();

//! we will write routes in next file

// 3. Make the server listen on port 3000
// The function inside 'listen' runs once the server is ready
app.listen(3000, () => {
  console.log("listening on PORT 3000"); // Just prints a message to know the server is running
});
