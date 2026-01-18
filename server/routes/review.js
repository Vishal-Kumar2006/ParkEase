const express = require("express");
const router = express.Router();

const {
  createNewReview,
  getReviewByParkingId,
  deleteReviewbyId,
} = require("../controllers/review");

router.post("/new", createNewReview);

router.get("/parking/:id", getReviewByParkingId);

router.delete("/:id", deleteReviewbyId);

module.exports = router;
