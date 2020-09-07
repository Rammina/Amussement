require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");

// const { body, validationResult } = require("express-validator/check");
// const { sanitizeBody } = require("express-validator/filter");

const async = require("async");
const path = require("path");

// retrieve friends list
exports.get_all_friends = async (req, res) => {
  console.log("retrieving friends list");

  try {
    // just for testing
    // User.requestFriend("5f37968791a1101ad49b2fc2", req.params.id);
    const user = await User.findById(req.params.id).select("_id");
    if (!user) throw Error("User does not exist.");

    const getFriendsCb = (err, friends) => {
      {
        if (err) throw Error("Error retrieving friend list.");
        res.status(200).json(friends);
      }
    };
    User.getFriends(user, {}, null, { sort: { username: 1 } }, getFriendsCb);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// retrieve a friend
exports.get_friend = async (req, res) => {
  console.log("retrieving a friend");
  try {
    const user = await User.findById(req.params.id).select("_id");
    if (!user) throw Error("User does not exist.");
    const getFriendCb = (err, friend) => {
      {
        if (err) throw Error("Error retrieving friend.");
        res.status(200).json(friend);
      }
    };
    User.getFriends(user, { _id: req.params.receiverId }, null, getFriendCb);
  } catch (e) {
    console.log(e);

    res.status(400).json({ msg: e.message });
  }
};

// sends a friend request to a user
exports.add_friend = async (req, res) => {
  console.log("sending a friend request");
  try {
    const sender = await User.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender of the friend request does not exist.");
    const receiver = await User.findById(req.params.receiverId).select("_id");
    if (!receiver)
      throw Error("Receiver of the friend request does not exist.");
    const requestFriendCb = err => {
      if (err) throw Error("Failed to send friend request.");
      res.status(200).json({ success: true });
    };
    User.requestFriend(sender._id, receiver.friend._id, requestFriendCb);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// remove friendship with a user
exports.remove_friend = async (req, res) => {
  console.log("removing a friend");
  try {
    const sender = await User.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender does not exist.");
    const receiver = await User.findById(req.params.receiverId).select("_id");
    if (!receiver)
      throw Error("The user you are about to unfriend does not exist.");
    const removeFriendCb = err => {
      if (err) throw Error("Failed to remove friend.");
      res.status(200).json({ success: true });
    };
    User.removeFriend(sender._id, receiver.friend._id, removeFriendCb);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};
