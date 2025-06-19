const express = require("express");
const router = express.Router();
const {handleBooking, getBookingById} = require("../controllers/booking.js");

router.post("/book", handleBooking);
router.get("/:id", getBookingById);


module.exports = router;