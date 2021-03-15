require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");
const Room = require("../models/room");

// const { body, validationResult } = require("express-validator/check");
// const { sanitizeBody } = require("express-validator/filter");

const async = require("async");
// const { arrayHasObjectWithPropAndValue, isAddedFriend } = require("../helpers");
// retrieve rooms list
exports.get_all_rooms = async (req, res) => {
  console.log("retrieving rooms list");

  try {
    const room = await Room.findById(req.params.id).select("rooms");
    if (!room) throw Error("Room does not exist.");

    res.status(200).json(room.rooms);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.create_room = async (req, res) => {
  const { name, ownerId, type, requires_approval, image_url } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the room." });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const room = await Room.findOne({ name });
      if (room) throw Error("Room name already taken.");

      const newRoom = new Room({
        name,
        type: type || "public",
        messages: [],
        members: [{ user: ownerId, roles: ["admin", "owner", "member"] }],
        image_url: image_url || "",
        requires_approval: requires_approval || false,
      });
      const savedRoom = await newRoom.save();
      if (!savedRoom) throw Error("Failed to create the room.");

      // update the owner of the room to add the newly created room to their list of rooms
      const owner = await User.findById(ownerId);
      console.log("owner rooms is");
      console.log(owner);
      console.log(owner.rooms);
      owner.rooms = [...owner.rooms, savedRoom];
      await owner.save();

      res.status(200).json({
        room: {
          _id: savedRoom._id,
          name: savedRoom.name,
          type: savedRoom.type || "public",
          messages: [],
          members: savedRoom.members || "",
          image_url: savedRoom.image_url || "",
          requires_approval: savedRoom.requires_approval || false,
        },
        user: { rooms: owner.rooms },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.join_room = async (req, res) => {
  const {
    name,
    userId,
    // type,
    // requires_approval,
    // image_url,
  } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the room." });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId).populate("rooms");
      // check if user is already in that room
      for (let room of user.rooms) {
        if (room.name === name) throw Error("Already a member of this room.");
      }

      const room = await Room.findOne({ name });
      if (!room) throw Error("Unable to find room with that name.");

      // just update the room's members
      room.members = [...room.members, { user: userId, roles: ["member"] }];
      await room.save();
      // update the user's room list'
      user.rooms = [...user.rooms, room];
      await user.save();

      res.status(200).json({
        room,
        user: { rooms: user.rooms },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.leave_room = async (req, res) => {
  const {
    name,
    userId,
    // type,
    // requires_approval,
    // image_url,
  } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the room." });
  }
  // if there areerrors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId).populate("rooms");
      /*
      // check if user is already in that room
      for (let room of user.rooms) {
        if (room.name === name) throw Error("Already a member of this room.");
      }
      */
      // note: should use ID
      // note:I don't think this will work with the populate because it is double nested
      const room = await Room.findOne({ name }).populate("members");
      if (!room) throw Error("Unable to find room with that name.");

      // just update the room's members
      // messages.filter((message) => message._id !== id)
      room.members = room.members.filter(
        (member) => member.user._id !== userId
      );
      await room.save();
      // update the user's room list'
      user.rooms = user.rooms.filter((room) => {
        room.name !== name;
      });
      await user.save();

      res.status(200).json({
        room,
        user: { rooms: user.rooms },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};
/*

// retrieve a room
exports.get_room = async (req, res) => {
  console.log("retrieving a room");
  try {
    const room = await Room.findById(req.params.id).select("_id");
    if (!room) throw Error("Room does not exist.");
    const getFriendCb = (err, room) => {
      {
        if (err) throw Error("Error retrieving room.");
        res.status(200).json(room);
      }
    };
    Room.getFriends(room, { _id: req.params.receiverId }, null, getFriendCb);
  } catch (e) {
    console.log(e);

    res.status(400).json({ msg: e.message });
  }
};

// sends a room request to a room
exports.add_room_with_roomname = async (req, res) => {
  console.log("sending a room request");
  try {
    const { roomname } = req.body;
    if (!roomname) {
      throw Error("Please provide a roomname.");
    }

    const sender = await Room.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender of the room request does not exist.");
    // check if room is already added/invited
    // let isFriend = null;
    const getFriendsCb = (err, rooms) => {
      try {
        if (err) throw Error("Error retrieving room list.");
        console.log(rooms);
        if (isAddedFriend(rooms, roomname)) {
          console.log("it breaks online 71");
          throw Error("Room has already been added/invited.");
          // isFriend = true;
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
      }
    };
    await Room.getFriends(sender, {}, getFriendsCb);
    // if (isFriend) throw Error("Room has already been added/invited.");

    const receiver = await Room.findOne({ roomname: roomname }).select("_id");
    if (!receiver)
      throw Error("Receiver of the room request does not exist.");
    console.log("does line eighty 5 run");
    const requestFriendCb = (err) => {
      if (err) throw Error("Failed to send room request.");
      console.log("do we get here?");
      res.status(200).json({ success: true });
    };
    Room.requestFriend(sender._id, receiver._id, requestFriendCb);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.add_room_with_id = async (req, res) => {
  console.log("sending a room request");
  try {
    console.log(req.body);
    const roomId = req.body;
    if (!roomId) {
      throw Error("Please provide room ID.");
    }

    const sender = await Room.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender of the room request does not exist.");
    const receiver = await Room.findById(req.params.roomId).select("_id");
    if (!receiver)
      throw Error("Receiver of the room request does not exist.");
    const requestFriendCb = (err) => {
      if (err) throw Error("Failed to send room request.");
      res.status(200).json({ success: true });
    };
    Room.requestFriend(sender._id, receiver._id, requestFriendCb);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// remove roomship with a room
exports.remove_room = async (req, res) => {
  console.log("removing a room");
  try {
    const sender = await Room.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender does not exist.");
    const receiver = await Room.findById(req.params.roomId).select("_id");
    if (!receiver)
      throw Error("The room you are about to unroom does not exist.");
    const removeFriendCb = (err) => {
      if (err) throw Error("Failed to remove room.");
      res.status(200).json({ success: true });
    };
    Room.removeFriend(sender._id, receiver._id, removeFriendCb);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};
*/

/*
// minimum length for the password
if (password.length < 6) {
  errors.push({ msg: "Password must be at least 6 characters" });
}
*/

// note: try to add the room creator first then work around adding members automatically
/*
for(let member of newRoom.members){
  const user = await User.findById(member.id).select("-password");
}
*/
