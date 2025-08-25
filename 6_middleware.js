// importing the express library so we can create a server
const express = require("express");

// creating an express "app" (this is basically our server)
const app = express();

// this is just some fake "friends data"
// think of it as a list of friends saved in memory
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

//! ---------------- MIDDLEWARE FUNCTION ----------------
//! ---------------- MIDDLEWARE FUNCTION ----------------
//! ---------------- MIDDLEWARE FUNCTION ----------------
//! ---------------- MIDDLEWARE FUNCTION ----------------
//$ like a security guard, u first meet him, then go inside the building, do ur business, come back, meet again and then leave
//$ like a security guard, u first meet him, then go inside the building, do ur business, come back, meet again and then leave
//$ like a security guard, u first meet him, then go inside the building, do ur business, come back, meet again and then leave
//$ like a security guard, u first meet him, then go inside the building, do ur business, come back, meet again and then leave

// app.use(...) runs for EVERY request (like /friends, /friends/2, etc.)
// It always runs BEFORE the actual route (like app.get).
//
app.use((req, res, next) => {
  // STEP 1: record the start time of the request
  const start = Date.now();

  // STEP 2: log the HTTP method (GET, POST, etc.) and the URL
  // Example: if user requests GET /friends → prints "GET, /friends"
  console.log(`${req.method}, ${req.url}`);

  // STEP 3: call next()
  // This is SUPER IMPORTANT → it tells Express:
  // "I'm done with middleware, now continue to the matching route"
  // If you forget next(), the request will hang forever.
  next();

  // STEP 4: after the route has finished and response is sent,
  // the code below runs. Now we check the end time.
  const finish = Date.now();

  // STEP 5: log how long the request took
  // Example: "time = 3ms"
  console.log(`time = ${finish - start}ms`);
});
//! ---------------- MIDDLEWARE FUNCTION ----------------
//! ---------------- MIDDLEWARE FUNCTION ----------------
//! ---------------- MIDDLEWARE FUNCTION ----------------
//! ---------------- MIDDLEWARE FUNCTION ----------------

// ROUTE 1: when someone goes to http://localhost:2898/friends
// send back ALL the friends data as JSON
app.get("/friends", (req, res) => {
  res.json(friends);
});

// ROUTE 2: when someone goes to http://localhost:2898/friends/2 (or any number)
// send back that specific friend
app.get("/friends/:friendId", (req, res) => {
  const friendId = req.params.friendId; // get the id from the URL
  res.json(friends[friendId]); // send back that one friend
  // ⚠️ BUG HERE: this uses array index, not the id value
  // so /friends/1 will give 2nd friend (index 1), not "Ajay"
});

// finally, start the server on port 2898
// so we can visit it in the browser or with Postman
app.listen(2898, () => {
  console.log("listening on port 2898");
});
