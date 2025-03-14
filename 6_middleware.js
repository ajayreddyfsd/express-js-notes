const express = require("express");
const app = express();

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

//simple middleware function
app.use((req, res, next) => {
    const start = Date.now()
  console.log(`${req.method}, ${req.url}`);
  //to call the next middleware function or end
  //here calls the mentioned route
    next();
    const finish = Date.now();
    console.log(`time = ${finish - start}ms`)
});

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
