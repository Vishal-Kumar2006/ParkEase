const express = require('express');
const router = express.Router();

const {createNewReview, getReviewById, deleteReviewbyId } = require("../controllers/review");


router.post("/new", createNewReview);

router.get("/:id", getReviewById);

router.delete("/:id", deleteReviewbyId);

module.exports = router;