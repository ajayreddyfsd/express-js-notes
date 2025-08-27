// 1. Import the Express library to create a web server
const express = require("express");
const path = require("path"); // For handling file paths

// 2. Create an instance of Express. 'app' is our server
const app = express();

// 3. Sample user object to send as JSON
const user = {
  name: "Ajay",
  age: 25,
  occupation: "Full Stack Developer",
  skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
};

// 4. ROUTE 1: Home page - sends plain text
app.get("/", (req, res) => {
  res.send("Welcome to my home page"); // Sends simple text
});

// 5. ROUTE 2: /index - sends an HTML file
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Sends an HTML page
});

// 6. ROUTE 3: /messages - sends another HTML file
app.get("/messages", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "messages.html")); // Sends another HTML page
});

// 7. ROUTE 4: /user - sends JSON data
app.get("/user", (req, res) => {
  res.json(user); // Sends the 'user' object as JSON
});

// 8. ROUTE 5: /image - sends an image file
app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "images", "img.jpg")); // Sends an image
});

// 9. ROUTE 6: /pdf - sends a PDF file
app.get("/pdf", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "docs", "resume.pdf")); // Sends a PDF file
});

// 10. ROUTE 7: /style - sends a CSS file
app.get("/style", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "css", "style.css")); // Sends a CSS file
});

// 11. Start the server on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
