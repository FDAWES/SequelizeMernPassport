// For the .env file to hide my credentials from the world
const dotenv = require("dotenv").config();
// Express
const express = require("express");
// Path
const path = require("path");
// Express Session
const session = require("express-session");
// Used to store our session info inside of MySQL
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Body Parser
const bodyParser = require("body-parser");
// Morgan Logger
const logger = require("morgan")("dev");
// My passport object configure with local (and potentially ) google strategy.
const passport = require("./passport");
// Pulling in my controllers to handle routing
const routes = require("./controllers");
// Grabbing my db connection
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

//#region MIDDLEWARE

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express to use sessions and also to save session information inside of MySQL
app.use(
  session(
    { 
      store: new SequelizeStore({
        db: db.sequelize
      }),
      secret: "I 4m abs0lut3ly 4w3s0m34!", 
      resave: true, 
      saveUninitialized: true 
    }
  )
);

// Initialize the passport middleware and session.
app.use(passport.initialize());
app.use(passport.session());
// Telling Express to use Morgan
app.use(logger);

// Informing Express about my routes
app.use(routes);

//#endregion MIDDLEWARE

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const forceSync = { force: false };

db.sequelize.sync(forceSync)
  .then(() => console.log("*Sync Success!*"))
  .catch(err => console.log("*Somthing bad has happened...*", err))

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
