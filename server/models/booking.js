const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
    required: true,
  },
  bookedSlots: {
    type: [Number], // Array of booked slot indexes
    required: true,
  },
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["Booked", "Checked-In", "Completed", "Cancelled"],
    default: "Booked",
  },
  bookingTime: { type: Date, default: Date.now }, // Corrected default value
});

module.exports = mongoose.model("Booking", bookingSchema);
