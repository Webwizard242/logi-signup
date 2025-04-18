const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], required: true },
  govId: { type: String, required: true }, 
  profilePic: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
