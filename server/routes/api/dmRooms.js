const express = require("express");
const router = express.Router({ mergeParams: true });

const dm_rooms_controller = require("../../controllers/directMessagesController");

// edit user settings

// get all rooms of a specific user
router.get("/", dm_rooms_controller.get_all_dm_rooms);

router.post("/", dm_rooms_controller.add_active_dm_room);

router.patch("/:roomId/leave", dm_rooms_controller.remove_active_dm_room);
router.patch(
  "/:roomId/leave_with_name",
  dm_rooms_controller.remove_active_dm_room_with_name
);

module.exports = router;
