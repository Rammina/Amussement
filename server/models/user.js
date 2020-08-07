const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, minlength: 3, required: true },
  username: { type: String, minlength: 1, maxlength: 30, required: true },
  password: { type: String, minlength: 1, maxlength: 30, required: true },
  imageUrl: { type: String, minlength: 1, maxlength: 500 },
  // settings: {type: }
  createdOn: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("User", userSchema);
