const express = require("express");
const app = express();

//this line of code is crucial for parsing json data for post requests, or else u will get undefined
app.use(express.json());

app.post("/submit", (req, res) => {
  //can directly print the received data like this
  console.log(req.body);

  //to send an acknowledgement that data is successfully recieved.
  res.status(200).json({ message: "Data received dude!!", data: req.body });
});

app.listen(3000, () => {
  console.log("listen on port 2898");
});
