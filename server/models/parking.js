const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  name: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://www.newdelhiairport.in/media/2011/premium-lane-parking.jpg",
  },
  location: { type: String, required: true },

  // 24 slots for 24 hours of the day (True = Available, False = Booked)
  totalSlots: {
    type: [Boolean],
    default: new Array(24).fill(true), // 24 slots initialized as available
  },

  pricePerHour: { type: Number, required: true },
  isOpen: { type: Boolean, default: true },
  isElectric: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Parking", parkingSchema);
