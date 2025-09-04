//@ this is a secureServer code using passport.js for google-social-sign-in
//@ and also to store the user data sent by google in cookie

// Bring in different tools (like helper-people) we need
const fs = require("fs"); // Helps us read/write files from/to computer
const path = require("path"); // Helps us find correct file/folder path
const https = require("https"); // Lets us run a secure website (https://)
const express = require("express"); // Helps us easily build websites
const helmet = require("helmet"); // like a security guard - Adds extra safety to website
const passport = require("passport"); // we need this tool to handle login/logout
const { Strategy } = require("passport-google-oauth20"); // we need this Special passport tool for Google logins
const cookieSession = require("cookie-session"); // we need this to Keep user logged in with cookies
require("dotenv").config(); // we need this to Load the secret keys from hidden .env file

// Website will run on this port (like door number)
const PORT = 3000;

// Secret keys from the .env file (hidden, not in code for safety)
const config = {
  CLIENT_ID: process.env.CLIENT_ID, // we get this from "google cloud console OAuth"
  CLIENT_SECRET: process.env.CLIENT_SECRET, // we get this from "google cloud console OAuth"
  COOKIE_KEY_1: process.env.COOKIE_KEY_1, // could be anything
  COOKIE_KEY_2: process.env.COOKIE_KEY_2, // could be anything
};

//! this is the info we send to google
const AUTH_OPTIONS = {
  //! once user allows the "google login popup", we are automatically directed to this route or url
  //! thats why while creating client ID in "google cloud console OAuth", we specified this as the re-direct url
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID, // Our Google App ID
  clientSecret: config.CLIENT_SECRET, // Our Google App Secret
};

//! when google sends back the user-data, we do this function
//$ This is a function that Passport (our login helper) calls after Google sends back the user info.
//$ It gets 4 things from Google:
//$ accessToken → a token that lets your app access Google data (like email)
//$ refreshToken → a token to get a new access token when the old one expires
//$ profile → Google’s info about the user (name, email, picture, etc.)
//$ done → a callback function you call when you’re done verifying the user
function verifyCallback(accessToken, refreshToken, profile, done) {
  //! Printing user info sent by google
  console.log("Google profile", profile);

  //! usually here we need to verify the user data, since data is coming from google, we can relax this verification and auto-approve
  //! so this is what u do when u wanna approve the data sent by google
  done(null, profile); // Tell passport "this user is okay"

  //! if the data doesnt pass your verification, u can do like below
  // done(new Error("User not authorized."), false);
}

//! passport.js code
//! passport.js code
//! passport.js code
//! passport.js code

//$ we pass above 2 here, the AUTH_OPTIONS and the verifyCallback
//! this is the code that sends "AUTH_OPTIONS" to google and does the verifyCallback once we get data from google
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//@ setting the data inside the cookie
//@ setting the data inside the cookie
//@ setting the data inside the cookie
//@ setting the data inside the cookie
// Saving the user info into the cookie (like writing student roll number on paper)
passport.serializeUser((user, done) => {
  // Store id + name + email in cookie
  done(null, {
    id: user.id,
    name: user.displayName,
    email: user.emails[0].value,
  });
});

//@ retrieving the data inside the cookie
//@ retrieving the data inside the cookie
//@ retrieving the data inside the cookie
//@ retrieving the data inside the cookie
// Reading user info back from the cookie (like finding student using roll number)
passport.deserializeUser((userData, done) => {
  // Read all info back from cookie
  done(null, userData);
});

//! passport.js code
//! passport.js code
//! passport.js code
//! passport.js code

// Make an Express app (our website)
const app = express();

// Use helmet for security
app.use(helmet());

//@ cookie definition - not the data inside the cookie
//@ cookie definition - not the data inside the cookie
//@ cookie definition - not the data inside the cookie
//@ cookie definition - not the data inside the cookie
//$ this is the cookie by name "session", that we are giving the browser to store
//$ this is just the cookie definition and not the data inside it
//$ we put the data inside the cookie using passport.serializeUser() and passport.deserializeUser()
app.use(
  cookieSession({
    name: "session", // name to identify the cookie
    maxAge: 24 * 60 * 60 * 1000, // 1 day, after this, this cookie expires
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2], // Keys to lock cookie
  })
);

// this code fixes cookie problems
// just some helper code, do not worry about the details, just put this to make passport.js happy
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate)
    req.session.regenerate = (cb) => cb();
  if (req.session && !req.session.save) req.session.save = (cb) => cb();
  next();
});

// initializes passport for our app
// and
// initializes cookie-based-passport-feature in our app
app.use(passport.initialize());
app.use(passport.session());

// Function to check if user is logged in
//! sample elaborate req object from user is given below as sample
function checkLoggedIn(req, res, next) {
  console.log("Current user is:", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({ error: "You must log in!" }); // Kick out if not logged in
  }
  next(); // Continue if logged in
}

//! when user clicks "login with google", it changes the URL and triggers /auth/google route
//! once this route is triggered, passport starts Google authentication
//! which means the "do you allow this app" page from Google appears on screen
//! if the user enters credentials and clicks allow, browser goes to /auth/google/callback, and the rest is taken care there
//! like: verifyCallback runs, user is serialized into cookie, and user is redirected
app.get("/auth/google", passport.authenticate("google", { scope: ["email"] }));

//! once route changes to "/auth/google/callback", passport starts its remaining job
//! it runs verifyCallback, stored/serialzes user data into cookie and re-directs the user to homepage if success
//! though there are no verifyCallback() or serialize() or ... in this code; passport.authenticate() calls them internally
//@ detailed step by step process
//@ 1. Browser hits /auth/google/callback with a special code from Google
//@ 2. passport.authenticate("google") middleware runs
//@ 3. Passport reads the code/token from Google
//@ 4. Passport calls the Google Strategy we defined earlier
//@    → this triggers our verifyCallback function
//@    → we get user profile info from Google
//@ 5. verifyCallback calls done(null, profile) → tells Passport login is OK
//@ 6. Passport calls serializeUser(user, done)
//@    → only user.id (or whatever we choose) is stored in the session cookie
//@ 7. Passport sets the session cookie in the browser
//@ 8. User is now logged in; future requests include this cookie automatically
//@ 9. If login succeeded → user is redirected to / (home page)
//@    If login failed → user is redirected to /failure
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure", // If login fails → go here
    successRedirect: "/", // If login works → go home page
    session: true, // Keep user logged in
  }),
  (req, res) => {
    console.log("Google called us back!"); // Just log it
  }
);

// Logout route → log user out and send them home
app.get("/auth/logout", (req, res, next) => {
  //! since we are using passport.js, we already have logout() defined on req-object. we just need to call it
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/"); // Go back to homepage
  });
});

// Secret page → only logged in users can see this
app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret value is 42!");
});

// If login fails
app.get("/failure", (req, res) => {
  return res.send("Failed to log in!");
});

// setting the Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//$ creating a secure server using https and also by passing key and cert
// Start the https server with certificate files
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"), // Secret key file
      cert: fs.readFileSync("cert.pem"), // Certificate file
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`); // Print that server is running
  });

//! this is how the request object from user looks like
//! usually we know of the simple http request object
//! here we have an elaborate one - coz we enabled passport and passport's cookies
//! so we gonna get extra details from the user for every request like "isAuthenticated" property
//! also, if user is already loggedIn, then cookie data is also included in this request object
// req = {
//   user: {
//     id: "1234567890", // stored by serializeUser
//     displayName: "Ajay Kumar", // optional, could store more
//     emails: [{ value: "ajay@example.com" }],
//   },
//   session: {
//     cookie: {
//       originalMaxAge: 86400000, // 1 day in ms
//       expires: "2025-09-05T17:00:00Z",
//       secure: false, // true if using HTTPS
//       httpOnly: true,
//       path: "/",
//     },
//   },
//   isAuthenticated: () => true, // Passport method
//   body: {}, // POST data
//   query: { ref: "google" }, // URL query parameters
//   params: { id: "42" }, // Route params
//   cookies: {
//     session: "s%3AencryptedDataHere...", // actual session cookie string
//   },
//   headers: {
//     host: "localhost:3000",
//     "user-agent": "Mozilla/5.0",
//   },
//   method: "GET",
//   url: "/secret",
// };
