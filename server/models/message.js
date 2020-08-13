const mongoose = require("mongoose");
// define a schema
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  body: { type: String, minlength: 1, maxlength: 2000, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sent_on: { type: Date, required: true, default: Date.now() }
  // link
  // comments
});

//compile and export model from schema
module.exports = mongoose.model("Message", messageSchema);
