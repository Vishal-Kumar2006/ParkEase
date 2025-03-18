const Booking = require("../models/booking");
const User = require("../models/user");
const Parking = require("../models/parking");

async function handleBooking(req, res) {
  try {
    const { userId, parkingId, bookedSlots, totalAmount } = req.body;

    console.log("User ID:", userId);

    // Create a new booking
    const newBooking = new Booking({
      userId,
      parkingId,
      bookedSlots,
      totalAmount,
    });

    console.log("New Booking:", newBooking);

    // Save the booking to the database
    const savedBooking = await newBooking.save();
    console.log("Saved Booking:", savedBooking);

    // Find the user and update their bookings list
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.bookings.push(savedBooking._id);
    await user.save(); // ✅ Save the updated user document
    console.log("Updated User:", user);

    // Find the parking and update its slots
    const parking = await Parking.findById(parkingId);
    if (!parking) {
      return res.status(404).json({ error: "Parking not found" });
    }
    // Update parking slots to mark them as booked
    bookedSlots.forEach((slot) => {
      if (slot >= 0 && slot < parking.totalSlots.length) {
        parking.totalSlots[slot] = false; // Mark slot as booked
      }
    });

    await parking.save(); // ✅ Save the updated parking document

    console.log("Updated Parking Slots:", parking.totalSlots);

    // Send success response
    res.status(201).json({
      message: "Booking successful",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error handling booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getBookingById(req, res) {
  try {
    console.log("Received ID:", req.params.id);

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { handleBooking, getBookingById };
