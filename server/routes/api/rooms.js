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

module.exports = router;
