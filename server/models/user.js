const mongoose = require("mongoose");
const mongooseFriends = require("mongoose-friends");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, minlength: 3, required: true },
  username: { type: String, minlength: 1, maxlength: 30, required: true },
  password: { type: String, required: true },
  // friends: [{status: String, }]
  date_of_birth: { type: Date, required: true },
  image_url: { type: String, minlength: 0, maxlength: 500 },
  registered_on: { type: Date, default: Date.now() }
});

userSchema.plugin(mongooseFriends({ pathName: "friends" }));

module.exports = mongoose.model("User", userSchema);
