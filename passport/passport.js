const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const router = require("express").Router();

// Grab the DB Models
const db = require("../models");

// Passport's serialize function. Choose what info gets stored in the session.
// In this case we're only storing the id in the session
passport.serializeUser(function(user, done) {
  console.log("**********Serializing User...");
  done(null, user.id);
});

// Using the id stored in the session, any requests coming in will perform this query
// to get the user and add the user to the request object
passport.deserializeUser(function(id, done) {
  console.log("**********Deserializing User...")
  db.User.findById(id)
    .then(({id, displayName, photoUrl}) => done(null, {id, displayName, photoUrl}))
    .catch(err => done(err));
});

/********************************Local Strategey******************************/
passport.use(
  new LocalStrategy(
    {
      // We are submitting from the client an object with the property "email" instead of "username"
      usernameField: "email"
    },
    function(username, password, done) {
      db.User.findOne({
        where: {
          email: username
        }
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }

          //these are the user object properties we want to return back to the client
          const {id, displayName, photoUrl } = user;

          return done(null, { id, displayName, photoUrl } );
        })
        .catch(err => done(err));
    }
  )
);

/********************************Google Strategey******************************
 * 
 * You must go to Google's developer console and configure a project
 * https://developers.google.com/identity/sign-in/web/sign-in#specify_your_apps_client_id
 * 
 */

// Utilizing the dotenv package you can set your GOOGLE_CLIENT_ID and SECRET in the .env file
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       //Let's see what google gives us back:
//       // console.log("*PROFILE: *", profile);

//       db.User.findOne({ where: { googleId: profile.id } })
//         .then(user => {
//           //if the users exists then pass it to the next .then
//           if(user){
//             return user;
//           }
//           //else create the new user and pass it to the next .then
//           else {
//             return db.User.create({
//               googleId: profile.id,
//               displayName: profile.displayName,
//               photoUrl: profile._json.image.url
//             })
//           }
//         })
//         .then(({id, displayName, photoUrl}) => {
//           cb(null, { id, displayName, photoUrl });
//         })
//         .catch(err => cb(err));
//     }
//   )
// );

module.exports = passport;
