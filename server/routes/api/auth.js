const express = require("express");
const router = express.Router();

const auth_controller = require("../../controllers/authController");

const auth = require("../../middleware/auth");

// load user
router.get("/user", auth, auth_controller.user_load);

// register a user
router.post("/register", auth_controller.user_register);

// Login
router.post("/login", auth_controller.user_login);

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
