const express = require("express");
const router = express.Router();

const settings_controller = require("../../controllers/authController");
// const friends_controller = require("../../controllers/friendsController");

const auth = require("../../middleware/auth");
// nested routes
const friendsRouter = require("./friends");
router.use("/:id/friends/", friendsRouter);

// edit user settings
// note: all of these should be patch below
router.patch(
  "/:id/settings/edit-account",
  settings_controller.user_edit_account
);

router.patch(
  "/:id/settings/change-password",
  settings_controller.user_change_password
);

router.patch(
  "/:id/settings/upload-avatar",
  settings_controller.user_upload_avatar
);

router.patch(
  "/:id/settings/remove-avatar",
  settings_controller.user_remove_avatar
);

router.patch(
  "/:id/settings/disable-account",
  settings_controller.user_disable_account
);

router.delete(
  "/:id/settings/delete-account",
  settings_controller.user_delete_account
);

module.exports = router;
