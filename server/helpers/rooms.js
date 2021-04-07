const Room = require("../models/room");

const updateRoomLastActivity = async (roomId) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) throw Error("Unable to find room with that ID.");
    room.last_activity = new Date();
    await room.save();
  } catch (e) {
    console.log(e);
  }
};

//note: temporary until I have implemented ID on room property of messages
const updateRoomLastActivityUsingName = async (name) => {
  try {
    const room = await Room.findOne({ name });
    if (!room) throw Error("Unable to find room with that ID.");
    room.last_activity = new Date();
    await room.save();
  } catch (e) {
    console.log(e);
  }
};

const updateRoomName = async (room, name) => {
  room.name = name;
  await room.save();
};

module.exports = {
  updateRoomLastActivity,
  updateRoomLastActivityUsingName,
  updateRoomName,
};
