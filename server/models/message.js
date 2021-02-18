const mongoose = require("mongoose");
// define a schema
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    text: { type: String, minlength: 1, maxlength: 2000, required: true },
    username: { type: String, required: true, minlength: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: String, required: true, minlength: 1 },

    // image_url: { type: String, minlength: 0, maxlength: 500 },
    // sent_on: { type: Date, required: true, default: Date.now() }
    // link
    // comments
  },
  { timestamps: true }
);

//compile and export model from schema
module.exports = mongoose.model("Message", messageSchema);
