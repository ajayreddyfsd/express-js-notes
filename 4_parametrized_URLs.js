// 1. Import Express library. Express helps us make a web server easily
const express = require("express");

// 2. Create an Express server. 'app' is our server
const app = express();

// 3. Create different JSON objects we want to send
const data = {
  user: {
    name: "Ajay",
    age: 25,
    occupation: "Full Stack Developer",
    skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
  },
  product: {
    id: 101,
    name: "Laptop",
    brand: "Dell",
    price: 1200,
    specs: { ram: "16GB", storage: "512GB SSD" },
  },
  book: {
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    genre: "Self-help",
  },
  movie: {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    rating: 8.8,
  },
};

// 4. Create a route that can change depending on what user types
// :type is called a "route parameter"
// Example: /data/user  OR  /data/book
app.get("/data/:type", (req, res) => {
  const type = req.params.type; // get what the user typed in the URL
  const result = data[type]; // find the JSON that matches the type

  if (result) {
    res.send(result); // send the JSON back to the user
  } else {
    res.status(404).send({ error: "Data not found" }); // if not found, send error
  }
});

// 5. Start the server on port 3000
// This line makes the server run and print a message in the terminal
app.listen(3000, () => {
  console.log("listening on port 3000");
});
