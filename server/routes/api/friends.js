const express = require("express");
// this enables the friends router to get the params of the parent route users
const router = express.Router({ mergeParams: true });

const friends_controller = require("../../controllers/friendsController");

// get all the friends of the user_register
router.get("/", friends_controller.get_all_friends);
// get a specific friend
router.get("/:friendId", friends_controller.get_friend);
// add a user as friend
router.post("/:friendId/add", friends_controller.add_friend);

// remove a user from the friendlist
router.post("/:friendId/remove", friends_controller.remove_friend);

module.exports = router;
