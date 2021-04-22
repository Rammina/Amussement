const mongoose = require("mongoose");
// define a schema
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    text: { type: String, minlength: 1, maxlength: 2000, required: true },
    username: { type: String, required: true, minlength: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: String, required: true, minlength: 1 },
  },
  { timestamps: true }
);

//compile and export model from schema
module.exports = mongoose.model("Message", messageSchema);

// note: I couldn't get this to work, so I'm setting it to string for now
// room: { type: mongoose.Schema.Types.ObjectId, required: true },

// roomName: { type: mongoose.Schema.Types.ObjectId, required: true },
// image_url: { type: String, minlength: 0, maxlength: 500 },
// sent_on: { type: Date, required: true, default: Date.now() }
// link
// comments
