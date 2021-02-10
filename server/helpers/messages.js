const Message = require("../models/message");
const { getUsersInRoom } = require("./users");

const storeMessageToDb = async (messageAttributes, cb) => {
  try {
    const messageObject = new Message(messageAttributes);
    const savedMessage = await messageObject.save();
    if (!savedMessage)
      throw Error("Unable to store the message in the database.");
    return savedMessage;
  } catch (e) {
    console.log(e);
  }
};

const retrieveMessagesFromDB = async (room) => {
  try {
    // retrieve from the database messages sorted by date
    const messages = await Message.find({ room })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(30);
    if (!messages) throw Error("Unable to find messages in this room.");
    return messages;
  } catch (e) {
    console.log(e);
  }
};

const deleteMessageFromDB = async (id) => {
  try {
    // delete the message with the same id from the database
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) throw Error("Unable to delete the message.");
    return deletedMessage;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  storeMessageToDb,
  retrieveMessagesFromDB,
  deleteMessageFromDB,
};
