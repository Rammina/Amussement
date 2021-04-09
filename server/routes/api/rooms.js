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

router.patch("/:id/leave", rooms_controller.leave_room);

router.patch("/:id/edit_room", rooms_controller.edit_room);

router.delete("/:id", rooms_controller.delete_room);

module.exports = router;
