const Review = require("../models/review");
const Parking = require("../models/parking");

async function createNewReview(req, res) {
  try {
    if (!req.session?.user?.id) {
      return res
        .status(401)
        .json({ error: "You must be logged in to create a review." });
    }

    // Find the parking lot and associate the review
    const currParking = await Parking.findById(req.body.parkingId);
    if (!currParking) {
      return res.status(404).json({ error: "Parking not found." });
    }

    // Create new review
    const newReview = new Review({ ...req.body, userId: req.session.user.id });
    await newReview.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

const getReviewByParkingId = async (req, res) => {
  try {
    const parkingId = req.params.id;

    const reviews = await Review.find({ parkingId }).populate(
      "userId",
      "name photo",
    );

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const deleteReviewbyId = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // req.user.id comes from auth middleware
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createNewReview, getReviewByParkingId, deleteReviewbyId };
