const express = require("express");
const router = express.Router();

const settings_controller = require("../../controllers/authController");

const auth = require("../../middleware/auth");

// edit user settings
router.post(
  "/:id/settings/edit-account",
  settings_controller.user_edit_account
);

module.exports = router;
