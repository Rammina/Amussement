const express = require("express");
const router = express.Router();

const rooms_controller = require("../../controllers/roomsController");

router.get("/:id", rooms_controller.get_room);
router.get("/dmRooms/:roomName", rooms_controller.get_dm_room);

router.post("/", rooms_controller.create_room);
// note: might want to use ID instead
router.patch("/:name/join", rooms_controller.join_room);

router.patch(
  "/:id/submit_room_password",
  rooms_controller.submit_room_password
);

router.patch("/:id/leave", rooms_controller.leave_room);

router.patch("/:id/edit_room", rooms_controller.edit_room);

router.patch("/:id/upload_icon", rooms_controller.upload_icon);

router.delete("/:id", rooms_controller.delete_room);

module.exports = router;
