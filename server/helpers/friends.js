/*
const User = require("../models/user");
const async = require("async");

exports.getUserFriends = async (userId) => {
  // note:experimental helper version to reduce redundancy in code
  try {
    const user = await User.findById(userId).select("_id");
    if (!user) throw Error("User does not exist.");

    const getFriendsCb = (err, friends) => {
      {
        if (err) throw Error("Error retrieving friend list.");
        console.log("here are the friends");
        console.log(friends);
        // res.status(200).json(friends);
        return friends;
      }
    };
    const friends = await User.getFriends(
      user,
      {},
      null,
      { sort: { username: 1 } },
      getFriendsCb
    );
  } catch (e) {
    console.log(e);
    // res.status(400).json({ msg: e.message });
    throw Error(e);
  }
};
*/
