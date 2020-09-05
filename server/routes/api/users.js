const express = require("express");
const router = express.Router();

const settings_controller = require("../../controllers/authController");
// const friends_controller = require("../../controllers/friendsController");

const auth = require("../../middleware/auth");
// nested routes
const friendsRouter = require("./friends");
router.use("/:id/friends/", friendsRouter);

// edit user settings
router.post(
  "/:id/settings/edit-account",
  settings_controller.user_edit_account
);

router.post(
  "/:id/settings/change-password",
  settings_controller.user_change_password
);

router.post(
  "/:id/settings/upload-avatar",
  settings_controller.user_upload_avatar
);

router.post(
  "/:id/settings/remove-avatar",
  settings_controller.user_remove_avatar
);

module.exports = router;
