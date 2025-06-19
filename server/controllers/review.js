const Review = require("../models/review");
const Parking = require("../models/parking");

async function createNewReview(req, res) {
  try {
    if (!req.session?.user?.id) {
      return res
        .status(401)
        .json({ error: "You must be logged in to create a review." });
    }

    console.log(req.body);

    // Find the parking lot and associate the review
    const currParking = await Parking.findById(req.body.parkingId);
    if (!currParking) {
      return res.status(404).json({ error: "Parking not found." });
    }

    // Create new review
    const newReview = new Review({ ...req.body, userId: req.session.user.id });
    const savedReview = await newReview.save();
    console.log(savedReview);

    // Update the Parking's Review Array
    currParking.review.push(newReview._id);
    await currParking.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

const getReviewById = async (req, res) => {
  try {
    // First of All Try to find Review
    const review = await Review.findById(req.params.id);

    // If Review Not Find Update with (404) error
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    // Res with (200) and Review
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const deleteReviewbyId = async (req, res) => {
  try {
    // Find and delete the review
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    // Remove the review ID from the corresponding Parking document
    const parkingId = review.parkingId;
    const currParking = await Parking.findById(parkingId);
    if (currParking) {
      currParking.review = currParking.review.filter(
        (reviewId) => !reviewId.equals(review._id)
      );
      await currParking.save();
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { createNewReview, getReviewById, deleteReviewbyId };
