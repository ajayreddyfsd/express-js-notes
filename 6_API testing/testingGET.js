const express = require("express");
const app = express();

const friends = [
  {
    id: 1,
    name: "Alice Johnson",
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

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = req.params.friendId;
  res.json(friends[friendId]);
});

app.listen(2898, () => {
  console.log("listening on port 2898");
});
