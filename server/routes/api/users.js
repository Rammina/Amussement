const express = require("express");
const router = express.Router();

const settings_controller = require("../../controllers/authController");

const auth = require("../../middleware/auth");

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

//note: deal with payload too large issue
/*
router.use("/:id/settings/upload-avatar", express.json({ limit: "50mb" }));
router.use(
  "/:id/settings/upload-avatar",
  express.urlencoded({ extended: "true" })
);
*/
module.exports = router;
