// =========================== POSTMAN TESTING GUIDE (SUPER SIMPLE) ===========================
//
// GOAL: Send some JSON data from Postman to our server and get a reply back.
//
// 0) START THE SERVER
//    - Save this file as server.js (or any name).
//    - In terminal run: node server.js
//    - You should see: "listen on port 2898"
//    - If you see an error "port in use", change 2898 to another number (e.g., 3000).
//
// 1) OPEN POSTMAN
//    - Create a NEW request.
//    - Method: POST
//    - URL: http://localhost:2898/submit
//
// 2) SET HEADERS (IMPORTANT!)
//    - Click the "Headers" tab.
//    - Add: Key = Content-Type   Value = application/json
//      (This tells the server "I am sending JSON")
//
// 3) SET BODY
//    - Click the "Body" tab.
//    - Choose "raw" (NOT form-data, NOT x-www-form-urlencoded).
//    - In the dropdown on the right of "raw", select "JSON".
//    - Paste sample JSON, for example:
     {
       "name": "Ajay",
       "age": 28,
       "likesCoding": true
     }
//
// 4) SEND IT
//    - Click "Send".
//    - You should get a JSON response back with message "Data received dude!!"
//    - In your terminal, you should also see the same JSON printed (that’s console.log(req.body)).
//
// 5) COMMON MISTAKES
//    - If req.body is undefined:
//        -> You probably forgot app.use(express.json()) OR Content-Type header is wrong OR body is not "raw JSON".
//    - If you get a 404 Not Found:
//        -> Make sure you used POST and the URL is /submit (exact).
//    - If you get a JSON parse error:
//        -> Your JSON is invalid (missing comma, quote, or brace). Fix the JSON and try again.
//
// ============================================================================================

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
  // Print whatever JSON the client (Postman) sent.
  // Example: if Postman body was { "name": "Ajay", "age": 28 }
  // this will print: { name: 'Ajay', age: 28 }
  console.log("Received body from client:", req.body);

  // Send a response back to the client to confirm we got the data.
  // - status(200) means "OK" (request succeeded).
  // - .json(...) sends a JSON response.
  // - We echo back the data they sent so they can see it came through.
  res.status(200).json({
    message: "Data received dude!!",
    data: req.body,
  });
});

// START THE SERVER on port 2898
// - Visit/POST to http://localhost:2898
// - Our route is specifically at POST /submit
app.listen(2898, () => {
  console.log("listen on port 2898");
});
