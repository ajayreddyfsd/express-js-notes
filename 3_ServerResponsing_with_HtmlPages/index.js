// 1. Import the Express library to create a web server
const express = require("express");

// 2. Create an instance of Express. 'app' is our server
const app = express();

// 3. This server can do 3 things:
//    - Send plain text as a response
//    - Send HTML pages as a response
//    - Send JSON objects as a response

// 4. Create a user object that we can send as JSON later
const user = {
  name: "Ajay",
  age: 25,
  occupation: "Full Stack Developer",
  skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
};

// 5. ROUTE 1: Home page - sends plain text
app.get("/", (req, res) => {
  res.send("Welcome to my home page"); // Sends simple text
});

// 6. ROUTE 2: /index - sends an HTML file
app.get("/index", (req, res) => {
  res.sendFile(
    "C:/Users/ajayr/OneDrive/Desktop/express-js-notes/3_Routes_with_HTML_pages/index.html"
  ); // Sends an HTML page from your computer
});

// 7. ROUTE 3: /messages - sends another HTML file
app.get("/messages", (req, res) => {
  res.sendFile(
    "C:/Users/ajayr/OneDrive/Desktop/express-js-notes/3_Routes_with_HTML_pages/messages.html"
  ); // Sends another HTML page
});

// 8. ROUTE 4: /user - sends JSON data
app.get("/user", (req, res) => {
  res.send(user); // Sends the 'user' object as JSON
});

// 9. Start the server on port 3000 and print a message in terminal
app.listen(3000, () => {
  console.log("listening on port 3000");
});
