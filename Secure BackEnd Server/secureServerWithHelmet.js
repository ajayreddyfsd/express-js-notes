const fs = require("fs");
const https = require("https");
const path = require("path");

//! first we create app from the app.js file
const app = require("./app");

//! next we make the object ready
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

//$ this is the helmet.js middleware
//$ ideally this shd be the first middleware if u r adding multiple middlewares
const helmet = require("helmet");
app.use(helmet()); // <-- adds security headers to all requests

//! now we pass both the above into https.createServer() to create a secure server
// Create HTTPS server with extra options
const server = https.createServer(sslOptions, app);

//! a simple function to start the server
async function startServer() {
  // Start listening for HTTPS requests
  server.listen(8000, () => {
    console.log("Secure HTTPS server running on port 8000...");
  });
}

//! start the server
startServer();
