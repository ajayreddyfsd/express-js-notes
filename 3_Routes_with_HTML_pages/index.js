const express = require("express");
const app = express();

const user = {
  name: "Ajay",
  age: 25,
  occupation: "Full Stack Developer",
  skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
};

app.get("/", (req, res) => {
  res.send("Welcome to my home page");
});

app.get("/index", (req, res) => {
  res.sendFile(
    "C:\\Users\\ajayr\\OneDrive\\Desktop\\Express Project\\3_Routes_with_HTML_pages\\index.html"
  );
});

app.get("/messages", (req, res) => {
  res.sendFile(
    "C:\\Users\\ajayr\\OneDrive\\Desktop\\Express Project\\3_Routes_with_HTML_pages\\messages.html"
  );
});

app.get("/user", (req, res) => {
  res.send(user);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
