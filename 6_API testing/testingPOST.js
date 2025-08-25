const express = require("express");
const app = express();

// STEP: Enable JSON body parsing.
// - This middleware reads the raw JSON from the request
//   and turns it into a JavaScript object on req.body.
// - Without this line, req.body will be undefined for JSON POSTs.
app.use(express.json());

// ROUTE: POST /submit
// - This route ONLY responds to POST requests at /submit.
// - If you try GET /submit, it will NOT match (and you’ll likely see 404).
app.post("/submit", (req, res) => {
  //! Print whatever JSON the client (Postman) sent.
  // Example: if Postman body was { "name": "Ajay", "age": 28 }
  // this will print: { name: 'Ajay', age: 28 }
  console.log("Received body from client:", req.body);

  //! Send a response back to the client to confirm we got the data.
  // - status(200) means "OK" (request succeeded).
  // - .json(...) sends a JSON response.
  // - We echo back the data they sent so they can see it came through.
  res.status(200).json({
    message: "Received Acknowledgement!!! Data received dude!!",
    data: req.body,
  });
});

// START THE SERVER on port 2898
// - Visit/POST to http://localhost:2898
// - Our route is specifically at POST /submit
app.listen(2898, () => {
  console.log("listen on port 2898");
});
