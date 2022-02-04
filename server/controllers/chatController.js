require("dotenv").config();
const Message = require("../models/message");

const message_store = (messageAttributes, cb) => {
  const messageObject = new Message(messageAttributes);
  messageObject
    .save()
    .then(() => {
      cb();
    })
    .catch((error) => {
      console.error(error);
    });
};

const message_retrieve = async (req, res) => {
  Message;
};

module.exports = { storeMessageToDb };
