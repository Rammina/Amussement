require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");

const { isAddedFriend } = require("../helpers");
// retrieve friends list
exports.get_all_friends = async (req, res) => {
  try {
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
    res.status(400).json({ msg: e.message });
  }
};

// retrieve a friend
exports.get_friend = async (req, res) => {
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
    res.status(400).json({ msg: e.message });
  }
};

// sends a friend request to a user
exports.add_friend_with_username = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      throw Error("Please provide a username.");
    }

    const sender = await User.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender of the friend request does not exist.");
    // check if friend is already added/invited

    const getFriendsCb = (err, friends) => {
      try {
        if (err) throw Error("Error retrieving friend list.");

        if (isAddedFriend(friends, username)) {
          throw Error("User has already been added/invited.");
          // isFriend = true;
        }
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
    };
    await User.getFriends(sender, {}, getFriendsCb);
    // if (isFriend) throw Error("User has already been added/invited.");

    const receiver = await User.findOne({ username: username }).select("_id");
    if (!receiver)
      throw Error("Receiver of the friend request does not exist.");
    const requestFriendCb = (err) => {
      if (err) throw Error("Failed to send friend request.");
      res.status(200).json({ success: true });
    };
    User.requestFriend(sender._id, receiver._id, requestFriendCb);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

exports.add_friend_with_id = async (req, res) => {
  try {
    const friendId = req.body;
    if (!friendId) {
      throw Error("Please provide friend ID.");
    }

    const sender = await User.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender of the friend request does not exist.");
    const receiver = await User.findById(req.params.friendId).select("_id");
    if (!receiver)
      throw Error("Receiver of the friend request does not exist.");
    const requestFriendCb = (err) => {
      if (err) throw Error("Failed to send friend request.");
      res.status(200).json({ success: true });
    };
    User.requestFriend(sender._id, receiver._id, requestFriendCb);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// remove friendship with a user
exports.remove_friend = async (req, res) => {
  try {
    const sender = await User.findById(req.params.id).select("_id");
    if (!sender) throw Error("Sender does not exist.");
    const receiver = await User.findById(req.params.friendId).select("_id");
    if (!receiver)
      throw Error("The user you are about to unfriend does not exist.");
    const removeFriendCb = (err) => {
      if (err) throw Error("Failed to remove friend.");
      res.status(200).json({ success: true });
    };
    User.removeFriend(sender._id, receiver._id, removeFriendCb);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
