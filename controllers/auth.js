const passport = require("../passport/passport");

const router = require("express").Router();

const db = require("../models");

router.post("/signup", (req, res) => {
  db.User.create(req.body).then(results => {
    res.json("/login");
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/getUser", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login"}),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
