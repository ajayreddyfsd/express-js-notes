// 1. Import Express library. Express helps us make a web server easily
const express = require("express");

// 2. Create an Express server. 'app' is our server
const app = express();

// 3. Create an array of friends. Each friend is an object with id, name, age, email, and isActive
const friends = [
  {
    id: 1,
    name: "Ajay Reddy",
    age: 28,
    email: "alice@example.com",
    isActive: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 34,
    email: "bob@example.com",
    isActive: false,
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 22,
    email: "charlie@example.com",
    isActive: true,
  },
  {
    id: 4,
    name: "Dana White",
    age: 40,
    email: "dana@example.com",
    isActive: false,
  },
];

// 4. ROUTE 1: /friends - sends the whole friends list as JSON
app.get("/friends", (req, res) => {
  res.json(friends); // json() automatically converts the array into JSON format
});

// 5. ROUTE 2: /friends/:friendId - sends a single friend by their id
// :friendId is a "route parameter" (placeholder in URL)
app.get("/friends/:friendId", (req, res) => {
  const friendId = req.params.friendId; // get the number from the URL
  res.json(friends[friendId]); // send only that friend as JSON
  // NOTE: This currently uses array index, not the actual friend id
});

// 6. Start the server on port 2898
app.listen(2898, () => {
  console.log("listening on port 2898");
});
