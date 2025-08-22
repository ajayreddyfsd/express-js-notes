const express = require("express");
const app = express();

// This server can do 3 things:
//    - Send plain text as a response
//    - Send HTML pages as a response
//    - Send JSON objects as a response

// JSON objects we can send
const user = {
  name: "Ajay",
  age: 25,
  occupation: "Full Stack Developer",
  skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
};

const product = {
  id: 101,
  name: "Laptop",
  brand: "Dell",
  price: 1200,
  specs: { ram: "16GB", storage: "512GB SSD" },
};

const book = {
  title: "Atomic Habits",
  author: "James Clear",
  pages: 320,
  genre: "Self-help",
};

const movie = {
  title: "Inception",
  director: "Christopher Nolan",
  year: 2010,
  rating: 8.8,
};

// ROUTE 1: Home page - plain text
app.get("/", (req, res) => {
  res.send("Welcome to my home page");
});

// ROUTE 2: /index - HTML page
app.get("/index", (req, res) => {
  res.sendFile(
    "C:\\Users\\ajayr\\OneDrive\\Desktop\\Express Project\\3_Routes_with_HTML_pages\\index.html"
  );
});

// ROUTE 3: /user - sends user JSON
app.get("/user", (req, res) => {
  res.send(user);
});

// ROUTE 4: /product - sends product JSON
app.get("/product", (req, res) => {
  res.send(product);
});

// ROUTE 5: /book - sends book JSON
app.get("/book", (req, res) => {
  res.send(book);
});

// ROUTE 6: /movie - sends movie JSON
app.get("/movie", (req, res) => {
  res.send(movie);
});

// Start the server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
