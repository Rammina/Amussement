// note:
// learn how to use array property in mongoose
// learn to use virtual property to figure out client-side names and image URLs

//note: work in progress
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  type: {
    type: String,
    required: true,
    enum: ["public", "private", "DM", "groupDM"],
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  messages: [
    {
      message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    },
  ],
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      roles: [{ type: String, minlength: 1 }],
    },
  ],
  //note: this should be different if it is DM room, consider making it a virtual property
  image_url: { type: String, minlength: 0, maxlength: 500 },
  registered_on: { type: Date, default: Date.now() },
  requires_approval: { type: Boolean, default: false },
  password: { type: String },
  // note: not sure if this is client-side or server-side
  disabled: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  last_activity: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Room", RoomSchema);
