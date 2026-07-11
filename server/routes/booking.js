const express = require("express");
const router = express.Router();
const {
  handleBooking,
  getBookingById,
  getBookingByUserId,
} = require("../controllers/booking.js");

router.post("/book", handleBooking);
router.get("/getBooking_byUserId", getBookingByUserId);

router.get("/:id", getBookingById);

module.exports = router;
