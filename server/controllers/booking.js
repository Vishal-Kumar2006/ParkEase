const Booking = require("../models/booking.js");
const User = require("../models/user.js");
const Parking = require("../models/parking.js");

async function handleBooking(req, res) {
  try {
    const { userId, parkingId, bookedSlots, totalAmount } = req.body;

    // Step 1: Find user and Parking (Mandatory) to book a slot
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const parking = await Parking.findById(parkingId);
    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      parkingId,
      bookedSlots,
      totalAmount,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Update parking slots to mark them as booked
    bookedSlots.forEach((slot) => {
      if (slot >= 0 && slot < parking.totalSlots.length) {
        parking.totalSlots[slot] = false; // Mark slot as booked
      }
    });

    // ✅ Save the updated parking document
    await parking.save();

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

async function getBookingByUserId(req, res) {
  try {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const bookings = await Booking.find({ userId: userId });
    res.status(201).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error creating parking", error });
  }
}

async function getBookingById(req, res) {
  try {
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

module.exports = { handleBooking, getBookingById, getBookingByUserId };
