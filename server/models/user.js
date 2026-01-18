const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: {
    type: String,
    required: true,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
