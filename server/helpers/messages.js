const Message = require("../models/message");

const storeMessageToDb = (messageAttributes, cb) => {
  const messageObject = new Message(messageAttributes);
  messageObject
    .save()
    .then(() => {
      cb();
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { storeMessageToDb };
