const express = require("express");
const router = express.Router();

const rooms_controller = require("../../controllers/roomsController");

// edit user settings
/*
// get all rooms of a specific user
router.get(
  "/:id/rooms/",
rooms_controller.get_all_rooms
);
*/
router.post("/", rooms_controller.create_room);
// note: might want to use ID instead
router.patch("/:name/join", rooms_controller.join_room);

router.patch("/:name/leave", rooms_controller.leave_room);

module.exports = router;
