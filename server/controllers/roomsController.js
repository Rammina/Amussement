require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");
const Room = require("../models/room");
const Message = require("../models/message");

// const { body, validationResult } = require("express-validator/check");
// const { sanitizeBody } = require("express-validator/filter");

const async = require("async");
// const { arrayHasObjectWithPropAndValue, isAddedFriend } = require("../helpers");
// retrieve rooms list
exports.get_all_rooms = async (req, res) => {
  console.log("retrieving rooms list");

  try {
    const user = await User.findById(req.params.id).select("rooms");
    if (!user) throw Error("User does not exist.");

    res.status(200).json(user.rooms);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.create_room = async (req, res) => {
  const {
    name,
    senderId,
    receiverId,
    type,
    requires_approval,
    image_url,
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
      const room = await Room.findOne({ name });
      if (room) throw Error("Room name already taken.");

      let members = [{ user: senderId, roles: ["admin", "owner", "member"] }];
      if (type === "DM") {
        members = [
          { user: senderId, roles: ["member"] },
          { user: receiverId, roles: ["member"] },
        ];
      }

      const newRoom = new Room({
        name,
        type: type || "public",
        messages: [],
        owner: senderId,
        members: members,
        image_url: image_url || "",
        requires_approval: requires_approval || false,
      });
      const savedRoom = await newRoom.save();
      if (!savedRoom) throw Error("Failed to create the room.");

      // update the owner of the room to add the newly created room to their list of rooms
      const owner = await User.findById(senderId);
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
          owner: savedRoom.owner,
          messages: [],
          members: savedRoom.members || "",
          image_url: savedRoom.image_url || "",
          requires_approval: savedRoom.requires_approval || false,
        },
        // user: { rooms: owner.rooms },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

// note: take into account what to do if the room requires a password to join
exports.join_room = async (req, res) => {
  const { name, userId } = req.body;
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
      if (!user) throw Error("Unable to find user with that ID.");

      // check if user is already in that room
      for (let room of user.rooms) {
        if (room.name === name) throw Error("Already a member of this room.");
      }

      const room = await Room.findOne({ name });
      if (!room) throw Error("Unable to find room with that name.");

      // check if the room requires a password to join
      if (room.password) {
        res.status(200).json({ password_required: true, roomId: room._id });
      }

      // just update the room's members
      room.members = [...room.members, { user: userId, roles: ["member"] }];
      await room.save();
      // update the user's room list'
      user.rooms = [...user.rooms, room];
      await user.save();

      res.status(200).json({
        room,
        // user: { rooms: user.rooms },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.leave_room = async (req, res) => {
  const { roomId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!roomId) {
    errors.push({ msg: "Please provide an ID for the room." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user." });
  }
  // if there areerrors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId).populate("rooms");
      if (!user) throw Error("Unable to find user with that ID.");

      // note: should use ID
      const room = await Room.findById(roomId).populate("members");
      if (!room) throw Error("Unable to find that room.");

      // just update the room's members
      room.members = room.members.filter(
        (member) => member.user._id !== userId
      );
      console.log(room.members);
      await room.save();
      // update the user's room list'
      user.rooms = user.rooms.filter((userRoom) => {
        // using == because one is an object and the other is a string, to allow conversion between data types
        // so it works as intended
        return userRoom._id != roomId;
      });
      await user.save();

      res.status(200).json({
        rooms: user.rooms,
        // user: { rooms: user.rooms },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.update_room_name = async (req, res) => {
  const { name, roomId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the room." });
  }
  if (!roomId) {
    errors.push({ msg: "Please provide an ID for the room." });
  }
  if (!userId) {
    errors.push({
      msg: "Please provide an ID for the user making the request.",
    });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the room using roomId
      const room = await Room.findById(roomId).populate("members.user");
      if (!room) throw Error("Unable to find that room.");
      //  allow action if the user is the owner
      if (room.owner == userId) authorized = true;
      // check the members of the room and check if user is authorized to perform the action (admin)
      for (let member of room.members) {
        if (member.user._id == userId) {
          for (let role of member.roles) {
            // allow the user to update the name if they are an admin
            if (role === "admin") authorized = true;
          }
        }
      }
      if (authorized) {
        room.name = name;
        await room.save();
        res.status(200).json({ roomId, name });
      } else {
        throw Error("Unauthorized action.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.edit_room = async (req, res) => {
  const { name, password, roomId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the room." });
  }
  if (!roomId) {
    errors.push({ msg: "Please provide an ID for the room." });
  }
  if (!userId) {
    errors.push({
      msg: "Please provide an ID for the user making the request.",
    });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the room using roomId
      const room = await Room.findById(roomId).populate("members.user");
      if (!room) throw Error("Unable to find that room.");
      //  allow action if the user is the owner
      if (room.owner == userId) authorized = true;
      // check the members of the room and check if user is authorized to perform the action (admin)
      for (let member of room.members) {
        if (member.user._id == userId) {
          for (let role of member.roles) {
            // allow the user to update the name if they are an admin
            if (role === "admin") authorized = true;
          }
        }
      }
      if (authorized) {
        room.name = name;
        // if password was included in the request body
        if (password) {
          // check if salt generation has any errors
          const salt = await bcrypt.genSalt(10);
          if (!salt)
            throw Error("Something went wrong with encrypting the password.");
          // check if hashing the password has any errors
          const hash = await bcrypt.hash(password, salt);
          if (!hash) throw Error("Something went wrong hashing the password.");

          room.password = hash;
        }
        await room.save();
        console.log("294");
        console.log(room);
        res.status(200).json(room);
      } else {
        throw Error("Unauthorized action.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.delete_room = async (req, res) => {
  const { roomId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!roomId) {
    errors.push({ msg: "Please provide an ID for the room." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user." });
  }
  // if there areerrors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      /*
      const user = await User.findById(userId).populate("rooms");
      if(!user)throw Error("Unable to find user with that ID.")
    */

      const room = await Room.findById(roomId);
      if (!room) throw Error("Unable to find that room.");

      // delete all the messages that belong to this room
      // Site.deleteMany({ userUID: uid, id: [10, 2, 3, 5]}, function(err)
      await Message.deleteMany({ room: room.name });
      await room.remove();
      res.status(200).json({ roomId });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};
