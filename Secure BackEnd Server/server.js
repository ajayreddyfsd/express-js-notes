const fs = require("fs");
const https = require("https");
const path = require("path");

//! first we create app from the app.js file
const app = require("./app");

//! now we pass it into https.createServer() to create a secure server
// Create HTTPS server with extra options
const server = https.createServer(app);

//! a simple function to start the server
async function startServer() {
  // Start listening for HTTPS requests
  server.listen(8000, () => {
    console.log("Secure HTTPS server running on port 8000...");
  });
}

//! start the server
startServer();
