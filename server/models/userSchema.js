const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    photoUrl: { type: String },
    bookings: { type: Array }, 
    parkings: { type: Array }
});

// ✅ Use Passport-Local Mongoose for authentication (NO need to store passwords manually)
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// ✅ Export the model
module.exports = mongoose.model("User", userSchema);
