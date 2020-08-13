const express = require("express");
const router = express.Router();

const user_controller = require("../../controllers/authController");

// const passport = require("passport");
// const config = require("../config");
// console.log(config);

// Load User model
// const User = require("../../models/user");
// import usercontroller functions
// note: figure out what this does first
// const { forwardAuthenticated } = require("../config/auth");

// Login Page
// router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
// router.get("/register", forwardAuthenticated, (req, res) =>
// res.render("register")
// );

// Register
// router.post("/register", (req, res) => {
//   console.log("I am here");
//   console.log(req.body);
//   // console.log(res);
//   res.json({ cute: "may" });
// });
router.post("/register", user_controller.user_register);
/*
// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
*/

module.exports = router;
