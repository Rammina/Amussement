const Message = require("../models/message");
const { getUsersInRoom } = require("./users");

const storeMessageToDb = (messageAttributes, cb) => {
  const messageObject = new Message(messageAttributes);
  return messageObject.save();
  // .then(() => {
  //   cb();
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};

const retrieveMessagesFromDB = (room) => {
  try {
    // retrieve from the database messages sorted by date
    return Message.find({ room })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(30);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { storeMessageToDb, retrieveMessagesFromDB };
