const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const bodyParser = require("body-parser");
const logger = require("morgan")("tiny");

const passport = require("./passport");
const routes = require("./controllers");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

//#region MIDDLEWARE

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport
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
app.use(passport.initialize());
app.use(passport.session());

app.use(logger);

//controllers
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
