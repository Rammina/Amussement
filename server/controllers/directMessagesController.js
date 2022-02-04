require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");
const Room = require("../models/room");

// retrieve rooms list
exports.get_all_dm_rooms = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("active_dm_rooms")
      .populate({
        path: "active_dm_rooms",
        populate: [{ path: "members", populate: { path: "user" } }],
      });
    if (!user) throw Error("User does not exist.");
    // note: for emergency deleting

    if (user.active_dm_rooms.length >= 2) {
      user.active_dm_rooms.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.last_activity) - new Date(a.last_activity);
      });
    }
    res.status(200).json(user.active_dm_rooms);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

exports.add_active_dm_room = async (req, res) => {
  const { receiverId, name, type = "DM", requires_approval = false } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  const senderId = req.params.id;
  if (!senderId) errors.push({ msg: "Sender ID missing." });

  if (!receiverId) {
    errors.push({ msg: "Receiver ID missing." });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(senderId)
        .select("username image_url active_dm_rooms")
        .populate({
          path: "active_dm_rooms",
          populate: [{ path: "members", populate: { path: "user" } }],
        });
      if (!user) throw Error("Sender does not exist.");

      const receiver = await User.findById(receiverId).select(
        "username image_url"
      );
      if (!receiver) throw Error("Sender does not exist.");

      // look for the room first and check if it exists
      const room = await Room.findOne({ name });
      let savedRoom = null;
      // if the room doesn't exist yet, create one on the database
      if (!room) {
        const newRoom = new Room({
          name: name,
          type: "DM",
          messages: [],
          members: [
            { user: senderId, roles: ["member"] },
            { user: receiverId, roles: ["member"] },
          ],
          image_url: "",
          requires_approval: false,
        });
        savedRoom = await newRoom.save();
        if (!savedRoom) throw Error("Failed to create the room.");
      }

      let addNothing = false;
      for (let activeRoom of user.active_dm_rooms) {
        if (activeRoom.name === name) {
          addNothing = true;
          // don't add any more and just return null so it doesn't change anything
          res.status(200).json(null);
        }
      }
      // add  the room as active
      if (!addNothing) {
        const addedRoom = savedRoom || room;
        const addedRoomObject = { ...addedRoom._doc };
        // to make it compatible with the frontend, and make it so that the users are objects and not IDs
        addedRoomObject.members = [
          {
            user: {
              _id: user._id,
              username: user.username,
              image_url: user.image_url,
            },
            roles: ["member"],
          },
          {
            user: {
              _id: receiver._id,
              username: receiver.username,
              image_url: receiver.image_url,
            },
            roles: ["member"],
          },
        ];

        user.active_dm_rooms = [...user.active_dm_rooms, addedRoomObject];
        await user.save();

        res.status(200).json(addedRoomObject);
      }
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.remove_active_dm_room = async (req, res) => {
  const roomId = req.params.roomId;
  const userId = req.params.id;
  let errors = [];

  // check if any of the following fields are empty
  if (!userId) {
    errors.push({
      msg: "Sender ID missing. Unauthorized action. Please login.",
    });
  }
  if (!roomId) {
    errors.push({ msg: "Room ID missing." });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId)
        .select("active_dm_rooms")
        .populate({
          path: "active_dm_rooms",
          populate: [{ path: "members", populate: { path: "user" } }],
        });

      if (!user) throw Error("User does not exist.");

      user.active_dm_rooms = user.active_dm_rooms.filter(
        (room) => room._id != roomId
      );
      // note: figure out what's wrong here? I think it's the reducer
      await user.save();
      res.status(200);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.remove_active_dm_room_with_name = async (req, res) => {
  const { name } = req.body;
  const userId = req.params.id;
  let errors = [];

  // check if any of the following fields are empty
  if (!userId) {
    errors.push({
      msg: "Sender ID missing. Unauthorized action. Please login.",
    });
  }
  if (!name) {
    errors.push({ msg: "Room name missing." });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId)
        .select("active_dm_rooms")
        .populate({
          path: "active_dm_rooms",
          populate: [{ path: "members", populate: { path: "user" } }],
        });

      if (!user) throw Error("User does not exist.");

      user.active_dm_rooms = user.active_dm_rooms.filter(
        (room) => room.name != name
      );
      // note: figure out what's wrong here? I think it's the reducer
      await user.save();
      res.status(200);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
};

/*


    // this will just keep history of others' DM
    // const rooms = await Room.find({
    //   type: "DM",
    //   "members.user": { $in: [req.params.id] },
    // })
    //   .populate("members.user")
    //   .sort("-last_activity");
    // .populate({
    //   path: "members",
    //   populate: { path: "user" },
    // })
    // note: figure out the syntax for this
    //
    // if (!room) throw Error("Could not find any active DM.");

*/
